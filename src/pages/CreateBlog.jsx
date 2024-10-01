// src/CreateBlog.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/Editor/Editor.jsx';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const user = auth.currentUser; // Get the currently authenticated user
    console.log('Current user:', user); // Log the user for debugging

    e.preventDefault();
    try {
      await addDoc(collection(db, 'blog'), {
        title,
        content,
        createdAt: new Date(),
      });
      navigate('/bloglist');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h1>Create Blog Post</h1>
        <Editor content={content} setContent={setContent}/> 
        <button onClick={handleSubmit}>Create Post</button>
      
    </div>
  );
};

export default CreateBlog;
