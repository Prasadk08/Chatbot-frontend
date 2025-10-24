export default function Sidebar({ chats, onSelectChat, onCreateChat, currentChat }) {

  return (
    <div className="w-64 bg-gray-900 flex flex-col p-4 border-r border-gray-700">
      <button
        onClick={onCreateChat}
        className="bg-green-600 hover:bg-green-700 rounded-md py-2 px-3 mb-4 font-semibold"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 && (
          <p className="text-gray-400 text-sm">No chats yet</p>
        )}
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`cursor-pointer p-2 rounded-md mb-2 ${
              currentChat?.id === chat.id
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
