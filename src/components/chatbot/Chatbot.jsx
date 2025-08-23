import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../../services/chatService";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "¡Hola! Soy el asistente virtual de Sea View Resort. ¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    try {
      const reply = await sendChatMessage(text);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply || "Perdón, no pude entenderte 😅" },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al conectar con el servidor 😢" },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 0 }}>
      <div
        ref={scrollerRef}
        className="overflow-y-auto p-3 space-y-2 bg-gray-100"
        style={{ flexGrow: 1, minHeight: 0 }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-3 py-2 rounded-lg text-sm shadow break-words
              ${
                msg.sender === "user"
                  ? "bg-[#968260] text-white self-end ml-auto rounded-br-none"
                  : "bg-white text-gray-800 self-start mr-auto rounded-bl-none"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t bg-white">
        <input
          type="text"
          className="flex-grow border rounded-lg px-3 py-2 text-sm focus:outline-none"
          placeholder="Escribe tu mensaje…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#968260] hover:bg-[#7e6f4f] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
