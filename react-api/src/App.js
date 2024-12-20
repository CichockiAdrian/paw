import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './pages/posts';
import PostDetails from './pages/postdetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
