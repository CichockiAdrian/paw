import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Zapytanie do backendu na porcie 5000 (nie 3000)
        fetch("http://localhost:5000/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Błąd HTTP! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Pobrane dane:", data);
                setPosts(data);
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    }, []);

    return (
        <div>
            <h1>Lista postów</h1>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </li>
                    ))
                ) : (
                    <p>Brak postów lub błąd wczytywania.</p>
                )}
            </ul>
        </div>
    );
};

export default Home;
