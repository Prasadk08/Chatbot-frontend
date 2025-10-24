import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import { useState ,useEffect} from "react";

export default function Home() {
const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  // Load chats from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("pdf_chats");
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pdf_chats", JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const updateChatMessages = (id, messages) => {
    const updated = chats.map((chat) =>
      chat.id === id ? { ...chat, messages } : chat
    );
    setChats(updated);

    // Optional: also auto-update current chat
    const current = updated.find((c) => c.id === id);
    setCurrentChat(current);
  };


  return (
    <div className="h-screen w-screen flex bg-black text-white">

    {/* <h1 className="mx-auto text-center bg-amber-500">Welcome to PDF Chatter</h1> */}
      <Sidebar
        chats={chats}
        onSelectChat={setCurrentChat}
        onCreateChat={createNewChat}
        currentChat={currentChat}
      />
      <ChatArea
        chat={currentChat}
        updateMessages={updateChatMessages}
      />
    </div>
  );
}
