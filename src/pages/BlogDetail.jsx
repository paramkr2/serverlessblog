// src/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = doc(db, 'blog', id);
      const blogSnapshot = await getDoc(blogDoc);
      if (blogSnapshot.exists()) {
        setBlog(blogSnapshot.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
