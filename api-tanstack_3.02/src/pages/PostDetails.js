import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = async (id) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
};

const fetchUser = async (userId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return data;
};

function PostDetails() {
    const { id } = useParams();

    const { data: post, error: postError, isLoading: postLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id),
    });

    const { data: user, error: userError, isLoading: userLoading } = useQuery({
        queryKey: ["user", post?.userId],
        queryFn: () => fetchUser(post.userId),
        enabled: !!post,
    });

    if (postLoading || userLoading) return <p>Loading...</p>;
    if (postError || userError) return <p>Error loading data!</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            {user && (
                <div>
                    <h2>Author: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            )}

            <Link to="/">Back to posts</Link>
        </div>
    );
}

export default PostDetails;
