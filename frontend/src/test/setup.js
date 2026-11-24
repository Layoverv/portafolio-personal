// Preparación común de las pruebas.
//
// Desde Node 22, Node trae su propio `localStorage` global. Sin la opción
// --localstorage-file queda sin funcionar y tapa el de jsdom, así que
// `window.localStorage` llega como undefined. Si eso pasa, instalamos un
// almacenamiento en memoria con la misma interfaz que el del navegador.
function createMemoryStorage() {
  const data = new Map();
  return {
    get length() {
      return data.size;
    },
    key: (index) => Array.from(data.keys())[index] ?? null,
    getItem: (key) => (data.has(String(key)) ? data.get(String(key)) : null),
    setItem: (key, value) => data.set(String(key), String(value)),
    removeItem: (key) => data.delete(String(key)),
    clear: () => data.clear(),
  };
}

for (const name of ['localStorage', 'sessionStorage']) {
  let works = false;
  try {
    works = typeof window[name]?.clear === 'function';
  } catch {
    works = false;
  }
  if (!works) {
    const storage = createMemoryStorage();
    Object.defineProperty(window, name, { value: storage, configurable: true, writable: true });
    Object.defineProperty(globalThis, name, { value: storage, configurable: true, writable: true });
  }
}
