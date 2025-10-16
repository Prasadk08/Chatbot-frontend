import FileUpload from "../components/FileUpload.jsx";
import ChatBox from "../components/ChatBot.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center bg-re">
          📄 RAG Chatbot
        </h1>
        <FileUpload onUpload={(data) => console.log("Uploaded:", data)} />
        <ChatBox />
      </div>
    </div>
  );
}
