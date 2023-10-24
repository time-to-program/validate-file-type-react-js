import React, { useState } from "react";
import './App.css'

function App() {
  // State to store the selected file
  const [file, setFile] = useState(null);

  // States for error handling
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");

  const [isSuccess, setIsSuccess] = useState(false)

  // Function to handle file input change
  const handleFileChange = (event) => {
    // Get the selected file from the input
    const selectedFile = event.target.files[0]; 
    setIsSuccess(false)

    // Checking if the file type is allowed or not
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setIsError(true)
      setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
      return;
    }

    setIsError(false)
    setFile(selectedFile);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // If there is an error, prevent submission and display an error message
    if(isError) return
    setErrorMsg("");

    // Checking if a file has been selected for upload
    if (!file) {
      setIsError(true)
      setErrorMsg("Please select a file.");
      return;
    }

    // Reset error state and indicate a successful upload
    setIsError(false)
    setIsSuccess(true)
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="title">File Type Validation</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              // accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
            />

            {isError && <div className="error-text">{errorMsg}</div>}

            <button type="submit">Upload</button>
            
            {isSuccess && <div className="success-text">Valid File Type</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
