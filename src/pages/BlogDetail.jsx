// src/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { parse } from 'node-html-parser';
import './styles/createBlog.css'
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [bodyContent, setBodyContent] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = doc(db, 'blog', id);
      const blogSnapshot = await getDoc(blogDoc);
      if (blogSnapshot.exists()) {
        const blogData = blogSnapshot.data();
        console.log(blogData)
        // Assuming blogData.content is in HTML format
        const root = parse(blogData.content);

        // Extract the first heading (e.g., h1, h2)
        const headingElement = root.querySelector('h1') || root.querySelector('h2');
        if (headingElement) {
          setTitle(headingElement.textContent);
          headingElement.remove(); // Remove the heading from the document so it's not repeated in the body content
        }

        // Get the remaining body content
        const remainingContent = root.toString();
        setBodyContent(remainingContent);
      } else {
        console.log('No such document!');
      }
    };

    fetchBlog();
  }, [id]);

  if (!title) return <div>Loading...</div>;

  return (
    <div className="editorPage">
      <h1>{title}</h1>
      {/* Render the rest of the blog content safely */}
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </div>
  );
};

export default BlogDetail;
