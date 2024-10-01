import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Pagination } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blog');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    };
    setLoggedIn(!!auth.currentUser);
    fetchBlogs();
    // Cleanup the subscription
    return ;
  }, []);

  // Pagination logic
  const handleChangePage = (event, value) => {
    setPage(value);
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
                <Typography variant="body2" color="textSecondary">{blog.content}</Typography>
              </Link>
              {loggedIn && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small" 
                  sx={{ position: 'absolute', bottom: 10, right: 10 }}
                  component={Link}
                  to={`/edit/${blog.id}`}
                >
                  Edit
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {/* Pagination Component */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination 
          count={Math.ceil(blogs.length / blogsPerPage)} 
          page={page} 
          onChange={handleChangePage} 
          color="primary"
        />
      </Box>
    </div>
  );
};

export default BlogList;
