import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Pobieranie danych o poście z backendu (port 5000)
        fetch(`http://localhost:5000/posts/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Błąd HTTP! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setPost({ title: data.title, content: data.content });
                setComments(data.comments);
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    }, [id]);

    const handleAddComment = () => {
        // Dodawanie nowego komentarza
        fetch(`http://localhost:5000/posts/${id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newComment }),
        })
            .then((res) => res.json())
            .then((data) => {
                setComments([...comments, data]);
                setNewComment("");
            })
            .catch((error) => console.error("Błąd:", error));
    };

    if (!post) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <h2>Komentarze</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>

            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Dodaj komentarz..."
            />
            <button onClick={handleAddComment}>Dodaj komentarz</button>
        </div>
    );
};

export default Post;
