import { useRef, useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onUpload(data);
    } catch (err) {
      console.error("Upload error:", err);
    }
    setLoading(false);
  };

  const uploadRef = ()=>{
    if(!file){
      console.log()
      fileInput.current.click()
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInput}
          className="flex-1 text-sm bg-blue-300 p-3 rounded-xl"
        />
        <button
          type="submit"
          disabled={loading}
          onClick={uploadRef}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
