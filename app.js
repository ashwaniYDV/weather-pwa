const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
})