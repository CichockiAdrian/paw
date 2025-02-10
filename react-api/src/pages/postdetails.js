import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/postdetails.scss';

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the post:", error);
            });

        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user:", error);
            });
    }, [id]);

    if (!post || !user) return <p>Loading...</p>;

    return (
        <div className="post-details">
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            <div className="post-author">
                <h2>Author: {user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
            </div>
        </div>
    );
}
export default PostDetails;
