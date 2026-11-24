import { useEffect, useRef, useState } from 'react';
import './BurnImage.css';

const DURATION = 1700; // milisegundos que tarda en quemarse la imagen

/* ---------- Shaders (programas que corren en la tarjeta gráfica) ---------- */
const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Para cada píxel: un "ruido" orgánico (fbm) más una pendiente vertical decide
// en qué momento se quema. Cerca del borde de quemado se oscurece (carbón)
// y brilla en naranja/amarillo (brasa). Debajo aparece la imagen nueva.
const FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uProgress;
uniform vec2 uScaleFrom;
uniform vec2 uScaleTo;
uniform float uTime;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
// Equivale a object-fit: cover
vec2 cover(vec2 uv, vec2 scale) { return (uv - 0.5) * scale + 0.5; }

void main() {
  vec4 from = texture2D(uFrom, cover(vUv, uScaleFrom));
  vec4 to = texture2D(uTo, cover(vUv, uScaleTo));

  // 0 = se quema primero, 1 = se quema al final. Empieza por abajo.
  float n = fbm(vUv * 3.2 + vec2(0.0, uTime * 0.05)) * 0.62 + vUv.y * 0.38;
  float threshold = uProgress * 1.15 - 0.1;
  float d = n - threshold; // < 0: ya se quemó

  float burnt = 1.0 - smoothstep(0.0, 0.012, d);
  float glow = 1.0 - smoothstep(0.0, 0.075, d);   // franja de brasa
  float char = 1.0 - smoothstep(0.0, 0.16, d);    // zona chamuscada

  vec3 img = from.rgb * (1.0 - char * 0.85);
  vec3 ember = mix(vec3(1.0, 0.18, 0.04), vec3(1.0, 0.82, 0.38), glow * glow);
  img += ember * glow * 1.6;

  // Un poco de brillo del fuego sobre la imagen nueva, solo justo detrás del borde
  vec3 revealed = to.rgb + vec3(1.0, 0.35, 0.1) * smoothstep(-0.07, 0.0, d) * 0.55;

  gl_FragColor = vec4(mix(img, revealed, burnt), 1.0);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Imagen que se quema al hacer clic y deja ver la siguiente.
 * Props: images = [{ src, alt }, ...] (mínimo 2). Cada clic avanza a la siguiente.
 * Sin WebGL o con "menos movimiento" activado, cambia de imagen sin animación.
 */
function BurnImage({ images }) {
  const canvasRef = useRef(null);
  const glState = useRef(null); // contexto, texturas y uniforms
  const [index, setIndex] = useState(0);
  const [burning, setBurning] = useState(false);
  const [webgl, setWebgl] = useState(true);

  // Prepara WebGL y carga todas las imágenes como texturas.
  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    let gl = null;
    try {
      gl = canvas?.getContext('webgl', { premultipliedAlpha: false }) || null;
    } catch {
      gl = null;
    }
    if (!gl) {
      setWebgl(false);
      return undefined;
    }

    const program = gl.createProgram();
    try {
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
    } catch {
      setWebgl(false);
      return undefined;
    }
    gl.useProgram(program);

    // Un rectángulo que cubre todo el lienzo (dos triángulos)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name) => gl.getUniformLocation(program, name);
    gl.uniform1i(uniform('uFrom'), 0);
    gl.uniform1i(uniform('uTo'), 1);

    Promise.all(images.map((image) => loadImage(image.src)))
      .then((loaded) => {
        if (cancelled) return;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        const textures = loaded.map((img) => {
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          return { texture, aspect: img.width / img.height };
        });
        glState.current = { gl, textures, uniform };
        draw(0, 1, 0, 0);
      })
      .catch(() => !cancelled && setWebgl(false));

    return () => {
      cancelled = true;
      glState.current = null;
    };
    // Las imágenes se definen una sola vez en projects.js
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dibuja un cuadro: imagen "from" quemándose sobre "to" según progress (0-1).
  function draw(from, to, progress, time) {
    const state = glState.current;
    const canvas = canvasRef.current;
    if (!state || !canvas) return;
    const { gl, textures, uniform } = state;

    // Tamaño real en píxeles de pantalla (nítido en pantallas de alta densidad)
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(canvas.clientWidth * ratio);
    const height = Math.round(canvas.clientHeight * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);

    // Escala para imitar object-fit: cover
    const canvasAspect = width / height;
    const scaleFor = (aspect) =>
      aspect > canvasAspect ? [canvasAspect / aspect, 1] : [1, aspect / canvasAspect];

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[from].texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures[to].texture);
    gl.uniform2fv(uniform('uScaleFrom'), scaleFor(textures[from].aspect));
    gl.uniform2fv(uniform('uScaleTo'), scaleFor(textures[to].aspect));
    gl.uniform1f(uniform('uProgress'), progress);
    gl.uniform1f(uniform('uTime'), time);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // Redibuja si cambia el tamaño de la tarjeta (por ejemplo, al girar el celular)
  useEffect(() => {
    if (!webgl) return undefined;
    const handleResize = () => !burning && draw(index, (index + 1) % images.length, 0, 0);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleClick = () => {
    if (burning) return;
    const next = (index + 1) % images.length;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!webgl || !glState.current || reducedMotion) {
      setIndex(next);
      if (glState.current) draw(next, (next + 1) % images.length, 0, 0);
      return;
    }

    setBurning(true);
    const start = performance.now();
    const tick = (now) => {
      const linear = Math.min((now - start) / DURATION, 1);
      const eased = linear < 0.5 ? 2 * linear * linear : 1 - (-2 * linear + 2) ** 2 / 2;
      draw(index, next, eased, now / 1000);
      if (linear < 1) {
        requestAnimationFrame(tick);
      } else {
        draw(next, (next + 1) % images.length, 0, 0);
        setIndex(next);
        setBurning(false);
      }
    };
    requestAnimationFrame(tick);
  };

  const current = images[index];

  return (
    <button
      type="button"
      className={`burn ${burning ? 'burn--active' : ''}`}
      onClick={handleClick}
      aria-label={`${current.alt}. Haz clic para quemar la imagen y ver la siguiente.`}
    >
      {webgl ? (
        <canvas ref={canvasRef} className="burn__canvas" aria-hidden="true" />
      ) : (
        <img src={current.src} alt="" className="burn__canvas" loading="lazy" />
      )}

      {/* Chispas que suben mientras se quema */}
      <span className="burn__sparks" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="burn__spark" style={{ '--i': i }} />
        ))}
      </span>

      <span className="burn__hint" aria-hidden="true">
        Clic para quemar
      </span>
    </button>
  );
}

export default BurnImage;
