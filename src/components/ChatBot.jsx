import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/ask", { question });

      if (res.status == 202) {
        toast("Upload the file first!", {
          icon: "🚨 ",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      const botMessage = { role: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] mx-auto ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right w-full"
                : "bg-gray-100 self-start w-full"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
      </div>

      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
