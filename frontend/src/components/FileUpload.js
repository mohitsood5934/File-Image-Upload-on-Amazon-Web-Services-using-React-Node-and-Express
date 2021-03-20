import React, { useState } from "react";
import { API_URL } from "../constants/commonConstants";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);

  const submitFile = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        throw new Error("Select a file first!");
      }
      const formData = new FormData();
      formData.append("file", file[0]);
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFilePath(response && response.data && response.data.fileInfo.Location);
      setFile(null);
    } catch (error) {
      console.log("Error occurres while uploading a file!!", error);
    }
  };

  return (
    <div className="row">
      <form onSubmit={submitFile}>
        {filePath && (
          <>
            <span>File uploaded to Amazon S3 successfully</span>
            <a href={filePath}>Click here to access file</a>
          </>
        )}

        <label>Upload file</label>
        <input type="file" onChange={(event) => setFile(event.target.files)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default FileUpload;
