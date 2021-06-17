
const { PORT } = require('./settings.json');

const express = require('express');
const tymlogger = require('tymlogger');
const path = require('path');

const { write, success } = new tymlogger();
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(({ method, url }) => {
    write(`${method} ${url}`);
});

app.get('/app', (req, res) => {
    res.sendFile('./app.html');
});

app.listen(process.env.PORT || PORT, () => success(`Сервер запущен на ${process.env.PORT || PORT} порту.`));