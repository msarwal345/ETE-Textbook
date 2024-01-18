import React, { useState } from 'react';
import axios from 'axios';
import './UploadTextbook.css'; 
import NavScrollExample from '../Navbar/Navbar';


const UploadTextbook = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [category, setCategory] = useState('');
  const [uploadResult, setUploadResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !filename || !category) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('category', category);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData);
      const result = response.data;
      setUploadResult(result.message);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <>
    <NavScrollExample/>
    <div className='cnt'style={{display:"flex"}}>
    <div className='photo' style={{width:"40%",marginLeft:"45px"}}>
      <img src='open.jpg'   style={{width:"100%"}}/>
    </div>
    <div className="upload-container" style={{marginLeft:"205px"}}>
      <h2>Upload Textbook</h2>
      
      <label htmlFor="fileInput">Choose a PDF file:</label>
      <input type="file" id="fileInput" name="file" accept=".pdf" onChange={handleFileChange} />

      <label htmlFor="filenameInput">Filename:</label>
      <input type="text" id="filenameInput" value={filename} onChange={handleFilenameChange} />

      <label htmlFor="categoryInput">Category:</label>
      <input type="text" id="categoryInput" value={category} onChange={handleCategoryChange} />

      <button className="upload-button" onClick={handleUpload}>Upload</button>

      {uploadResult && <div className="upload-result">{uploadResult}</div>}

      <p>
        Don't have a PDF file? You can create one using an online tool like{' '}
        <a href="https://www.ilovepdf.com/" target="_blank" rel="noopener noreferrer">
           PDF Tool
        </a>
      </p>
    </div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default UploadTextbook;
