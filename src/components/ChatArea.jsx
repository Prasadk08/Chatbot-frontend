import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { RiFolderUploadFill } from "react-icons/ri";
import toast from "react-hot-toast";

export default function ChatArea({ chat, updateMessages }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto scroll to bottom when new messages come in
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-2xl">
        Welcome to PDF Chatter 
      </div>
    );
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !file) || !chat) return;
    setLoading(true);

    try {
      // CASE 1️⃣ — File upload only
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("https://chatbot-backend-8a81.onrender.com/upload", formData);
        toast.success("File uploaded successfully!");
        console.log("Uploaded:", res.data);
        setFile(null);
      }

      // CASE 2️⃣ — Text message only
      else if (input.trim()) {
        const userMessage = { role: "user", text: input };
        const updatedMessages = [...chat.messages, userMessage];
        updateMessages(chat.id, updatedMessages);
        setInput("");

        const res = await axios.post("https://chatbot-backend-8a81.onrender.com/ask", {
          question: input,
        });
        const botMessage = { role: "bot", text: res.data.answer };
        updateMessages(chat.id, [...updatedMessages, botMessage]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-3">
        {chat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] mx-auto p-2 rounded-lg text-center ${
              msg.role === "user"
                ? "bg-blue-700 text-right"
                : "bg-gray-800 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Processing...</p>}
        <div ref={scrollRef}></div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-3 border-t border-gray-700 bg-gray-900"
      >
        {/* Upload Icon */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={loading}
          className="text-gray-400 hover:text-white mr-2"
        >
          <RiFolderUploadFill size={22} />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />

        {/* Input Field */}
        <input
          type="text"
          placeholder={
            file ? `Ready to upload: ${file.name}` : "Type your message..."
          }
          className="flex-1 p-2 rounded-md bg-gray-800 text-white focus:outline-none"
          value={file ? "" : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!!file} // disable typing if file is selected
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="ml-2 bg-green-600 hover:bg-green-700 rounded-md px-4 py-2 text-white"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
