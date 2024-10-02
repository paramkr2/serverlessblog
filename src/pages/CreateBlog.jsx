// src/CreateBlog.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/Editor/Editor.jsx';
import './styles/createBlog.css'
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addBlogEntry } from '../store/blogSlice'; // Import the action

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const user = auth.currentUser; // Get the currently authenticated user

    const newBlogEntry = {
      id: Date.now().toString(), // Use a unique ID (or a better method)
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      if (user) {
        await addDoc(collection(db, 'blog'), {content});
        navigate('/blog');
      } else {
        // Dispatch to Redux store if the user is not logged in
        dispatch(addBlogEntry({newBlogEntry}));
        alert('Blog post saved locally. Please log in to save it permanently.');
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='editorPage'>
        <Editor content={content} setContent={setContent}/> 
        <button onClick={handleSubmit}>Create Post</button>
      
    </div>
  );
};

export default CreateBlog;
