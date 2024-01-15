import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ textbookId, username }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [textbookId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/textbooks/comments/${textbookId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const addComment = async () => {
    try {
      await axios.post('http://localhost:8000/textbooks/comment', {
        textbookId,
        text: newComment,
        author: username, // Use 'author' instead of 'username'
      });
      fetchComments();
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}:</strong> {comment.text}
          </li>
        ))}
      </ul>
      <textarea
        rows="4"
        cols="50"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default CommentSection;
