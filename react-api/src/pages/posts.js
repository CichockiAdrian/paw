import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/posts.scss';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the posts:", error);
            });
    }, []);

    return (
        <div className="post-list">
            <h1>Post List</h1>
            <div className="post-list-container">
                {posts.map(post => (
                    <div className="post-item" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body.slice(0, 100)}...</p>
                        <Link to={`/post/${post.id}`}>Read more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
