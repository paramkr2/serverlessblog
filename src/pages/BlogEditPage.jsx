// src/pages/BlogEditPage.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor/Editor.jsx';

const BlogEditPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = doc(db, 'blog', id);
      const blogSnapshot = await getDoc(blogDoc);
      if (blogSnapshot.exists()) {
        const blogData = blogSnapshot.data();
        setTitle(blogData.title);
        setContent(blogData.content);
      } else {
        console.error('No such document!');
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    const blogDoc = doc(db, 'blog', id);
    await updateDoc(blogDoc, {
      title,
      content,
    });
    alert('Blog updated successfully!');
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Edit Blog</Typography>
      <Editor title={title} content={content} setTitle={setTitle} setContent={setContent} />
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginTop: 2 }}>
        Update Blog
      </Button>
    </Box>
  );
};

export default BlogEditPage;
