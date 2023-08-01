import { ChangeEvent, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileType", selectedFile.type);

      const response = await fetch("/api/dataSource", {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="font-bold">hello there</div>
      <div>
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileChange}
          className="mr-4"
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            !selectedFile
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </div>
      {selectedFile && <div className="mt-4">Selected file: {fileName}</div>}
    </main>
  );
}
