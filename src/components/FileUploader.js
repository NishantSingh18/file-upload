import React, { useState } from "react";
import axios from "axios";
import "./FileUploader.css";

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileExtension(event.target.files[0].name.split(".").pop());
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    let url = "";
    if (fileExtension === "csv") {
      url = "http://localhost:8080/upload/csv";
    }else if (fileExtension === "xlsx" || fileExtension === "xlsm") {
        url = "http://localhost:8080/upload";
    } else if (fileExtension === "xml") {
      url = "http://localhost:8080/upload/xml";
    } else {
      alert("Invalid file type");
      return;
    }

    axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => console.log("Success:", response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">File Uploader</h1>
      </header>
      <div className="form-container">
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <>
            <p>File selected: {fileName}</p>
            <p>File extension: {fileExtension}</p>
            <button onClick={handleUpload}>Upload</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileInput;
