import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/suggest', async (req, res) => {
    const query= req.query.q || '';
    if (!query.trim()) {
        return res.json([]);
    }

    try{
        const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});