import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
};

function PostList() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Loading posts...</p>;
    if (error) return <p>Error fetching posts.</p>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
