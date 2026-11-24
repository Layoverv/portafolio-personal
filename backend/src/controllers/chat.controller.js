/**
 * Crea el controlador del chat.
 * Recibe la función que genera la respuesta (inyección de dependencias):
 * en producción es Gemini y en las pruebas una función falsa, así los
 * tests no gastan tokens ni necesitan API Key.
 */
export function createChatController(generateReply) {
  return async function chatController(req, res, next) {
    try {
      const { message, history } = req.chat; // datos ya validados por validateChat
      const reply = await generateReply(message, history);
      res.json({ reply });
    } catch (error) {
      next(error); // lo atiende errorHandler
    }
  };
}
