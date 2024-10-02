import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx'
import BlogEditPage from './pages/BlogEditPage.jsx';
import './index.css';
import { Provider } from 'react-redux'; // Import Provider

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit/:id" element={<BlogEditPage/>} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
