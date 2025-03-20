const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

const posts = [
    { id: 1, title: "post-1", content: "wiwiwi" },
    { id: 2, title: "post-2", content: "wawawa" },
];

const comments = {
    1: [{ id: 1, text: "no spoko" }, { id: 2, text: "kocham liczbe pi" }],
    2: [{ id: 3, text: "dokładnie" }],
};

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.id === postId);
    if (!post) return res.status(404).json({ message: "Post nie znaleziony" });

    res.json({ ...post, comments: comments[postId] || [] });
});

app.post("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    if (!comments[postId]) comments[postId] = [];

    const newComment = { id: Date.now(), text: req.body.text };
    comments[postId].push(newComment);

    res.json(newComment);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));
