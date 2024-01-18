import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TextBooklist.css'; 

const TextbookList = () => {
  const [textbooks, setTextbooks] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchTextbooks();
  }, [category]);


  
  const fetchTextbooks = async () => {
    try {
      let url = 'http://localhost:8000/textbooks';
      
      if (category) {
        url += `/${category}`;
      }

      const response = await axios.get(url);
      setTextbooks(response.data);
    } catch (error) {
      console.error('Error fetching textbooks:', error.message);
    }
  };

  const displayPdf = (pdfBuffer) => {
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  const downloadPdf = async (textbookId, filename) => {
    try {
      const response = await axios.get(`http://localhost:8000/textbooks/download/${textbookId}`, {
        responseType: 'arraybuffer',
      });

      const pdfBuffer = new Uint8Array(response.data);
      const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = filename || 'textbook.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading textbook:', error.message);
    }
  };

  const deleteTextbook = async (textbookId) => {
    try {
      await axios.delete(`http://localhost:8000/textbooks/${textbookId}`);
      fetchTextbooks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting textbook:', error.message);
    }
  };

  return (
    <div className="container">
      {/* <h2>Textbooks</h2> */}
      <div className="filter-section">
        <label className="label" htmlFor="category">Category:</label>
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="button" onClick={fetchTextbooks}>Filter</button>
      </div>
      <div className="card-container">
        {textbooks.map((textbook) => (
          <div key={textbook._id} className="card">
            <div className="card-title">
              <strong>{textbook.filename}</strong> - {textbook.category}
            </div>
            {textbook.file && (
              <div className="card-buttons">
                <button onClick={() => displayPdf(new Uint8Array(textbook.file.data))}>Open PDF</button>
                <button onClick={() => downloadPdf(textbook._id, textbook.filename)}>Download PDF</button>
                <button onClick={() => deleteTextbook(textbook._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* <CommentSection /> */}
      {/* <Footer/> */}
    </div>
  );
};

export default TextbookList;
