const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/download/video', async (req, res) => {
    try {
        const url = req.query.url;
        const info = await ytdl.getInfo(url);
        const videoFormats = ytdl.filterFormats(info.formats, 'videoonly');
        res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
        ytdl(url, { format: videoFormats[0].itag }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Er is een fout opgetreden');
    }
});

app.get('/download/audio', async (req, res) => {
    try {
        const url = req.query.url;
        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        res.header('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
        ytdl(url, { format: audioFormats[0].itag }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Er is een fout opgetreden');
    }
});

app.listen(port, () => {
    console.log(`Server is gestart op http://localhost:${port}`);
});
