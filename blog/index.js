import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json());

app.post('/posts', async (req, res) => {
    const { title, content, categoryId } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                categoryId
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się dodać posta' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                category: true,
                comments: true
            },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać postów' });
    }
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                comments: true
            },
        });
        if (!post) {
            res.status(404).json({ error: 'Post nie został znaleziony' });
        } else {
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać posta' });
    }
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    try {
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { title, content, categoryId },
        });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się zaktualizować posta' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się usunąć posta' });
    }
});

app.get('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await prisma.komentarz.findMany({
            where: { postId: parseInt(id) },
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Nie udało się pobrać komentarzy' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie http://127.0.0.1:${PORT}`);
});