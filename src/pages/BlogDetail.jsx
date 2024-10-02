// src/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { parse } from 'node-html-parser';
import { useSelector } from 'react-redux';
import './styles/createBlog.css'

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  let blogEntries = useSelector((state) => state.blog.entries); // Adjust according to your state structur

  useEffect(() => {
    const fetchBlog = async () => {
      let index = blogEntries.findIndex(entry => entry.id === id)
      let blogData;
      if( index != -1 ){ // i.e if exists in redux store 
        blogData = blogEntries[index];
      }else{
        const blogDoc = doc(db, 'blog', id);
        const blogSnapshot = await getDoc(blogDoc);
        if (blogSnapshot.exists()) {
          blogData = blogSnapshot.data();
          console.log(blogData)
        }
      }

      if (blogData) {
        const root = parse(blogData.content);
        const headingElement = root.querySelector('h1') || root.querySelector('h2');
        if (headingElement) {
          setTitle(headingElement.textContent);
          headingElement.remove(); // Remove the heading from the document so it's not repeated in the body content
        }

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
