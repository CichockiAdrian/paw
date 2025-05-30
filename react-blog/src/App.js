import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.js";
import Post from "./pages/post.js";
import Category from "./pages/category.js";
import './styles/_global.scss';
import './styles/home.scss';
import './styles/post.scss';
import './styles/categories.scss';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/category" element={<Category />} />
            </Routes>
        </Router>
    );
};

export default App;
