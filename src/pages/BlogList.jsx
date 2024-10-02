import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Pagination } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { parse } from 'node-html-parser'; // Import node-html-parser to parse HTML content

const BlogList = () => {
  const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
  const [page, setPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, 'blog');
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map(doc => {
          const blogData = { id: doc.id, ...doc.data() };
          const { title, body } = parseBlogContent(blogData.content);
          return { id: blogData.id, title, body };
        });
        console.log(blogList)
        setBlogs(blogList); // Update the blogs state with parsed data
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    // Monitor auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    fetchBlogs();

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  // Function to handle pagination
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Function to extract title and content
 const parseBlogContent = (content) => {
  console.log('parsing', content);
  
  try {
    const root = parse(content);
    const titleElement = root.querySelector('h1, h2, h3'); // Extract the first heading (h1, h2, or h3)
    
    // If no titleElement is found, log a warning
    if (!titleElement) {
      console.warn('No title element found in the content.');
    }

    const bodyContent = root.removeChild(titleElement).toString(); // Remove the title element from the content
    console.log('parsed');
    
    return {
      title: titleElement?.innerText || 'Untitled',
      body: bodyContent || 'No content available'
    };
  } catch (error) {
    console.error('Error parsing blog content: ', error);
    return {
      title: 'Error', // Return a default title in case of error
      body: 'Failed to parse content. Please check the content format.' // Return a default body in case of error
    };
  }
};


  // Function to delete a blog post
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'blog', id)); // Delete the document from Firestore
      setBlogs(blogs.filter(blog => blog.id !== id)); // Update local state
      alert('Blog post deleted successfully.'); // Optional: Show success message
    } catch (error) {
      console.error('Error deleting blog post: ', error);
      alert('Error deleting blog post.'); // Optional: Show error message
    }
  };

  const displayedBlogs = blogs.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  return (
    <div>
      <h1>Blog List</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {displayedBlogs.map(blog => (
          <Card key={blog.id} sx={{ width: '80%', marginBottom: 2, position: 'relative' }}>
            <CardContent>
              <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5" component="div">{blog.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* Show a short preview of the body content */}
                  {blog.body.substring(0, 150)}...
                </Typography>
              </Link>
              {loggedIn && (
                <>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    sx={{ position: 'absolute', bottom: 10, right: 70 }}
                    component={Link}
                    to={`/edit/${blog.id}`}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    sx={{ position: 'absolute', bottom: 10, right: 10 }}
                    onClick={() => handleDelete(blog.id)} // Call the delete function
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {/* Pagination Component */}
      {blogs.length > 0 && ( // Check if blogs exist before rendering Pagination
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination 
            count={Math.ceil(blogs.length / blogsPerPage)} 
            page={page} 
            onChange={handleChangePage} 
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default BlogList;
