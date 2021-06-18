
const { PORT } = require('./settings.json');

const express = require('express');
const tymlogger = require('tymlogger');
const path = require('path');
const { Server } = require('socket.io');
const generateUsers = require('./generateUsers');
const bomber = require('./bomber');

const { write, success } = new tymlogger();
const app = express();

const server = require('http').createServer(app);
const io = new Server(server);


// ===== DATA ======
let users = generateUsers();
let attacksCount = 0;
// ===== DATA ======

const checkAuth = (token) => {
    for (let user of users) {
        if (user.token === token) return { user, auth: true };
    }
    return { auth: false };
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(({ method, url, query }, res, next) => {
    write(`${method} ${url} ${query ? `=> ${JSON.stringify(query)}` : ''}`);
    next();
});

app.get('/app', (req, res) => {
    res.sendFile('./app.html');
});

app.get('/auth', ({ query: { login, password } }, res) => {
    for (let user of users) {
        const { token } = user;

        if (login === user.login) {
            if (password === user.password) {
                res.send({ token });
                return;
            } else {
                res.send({ error: 'Неправильный пароль' });
                return;
            }
        }
    }

    res.send({ error: 'Пользователь не найден' });
});

app.get('/user', ({ query: { token } }, res) => {
    const { user, auth } = checkAuth(token);

    if (auth) {
        res.send({ name: user.login });
    } else {
        res.send({ error: "Пользователь не найден" });
    }
});

app.get('/constants', (req, res) => {
    const constants = require('./constants.json');
    let code = '';

    for (let name in constants) {
        code += `const ${name} = "${constants[name]}";\n`
    }

    res.setHeader('Content-Type', "text/javascript");
    res.send(code);
});

const {
    ATTACKS,
    START,
    SERVICES_COUNT
} = require('./constants.json');

io.on('connection', (socket) => {
    write('[SOCKET] new connection');

    socket.on(START, ({ phone, count }) => {
        write(`[BOMBER] START ${phone} -> ${count} count`);
        attacksCount++;
        socket.emit(ATTACKS, attacksCount);
        bomber.start(phone, count, () => {
            success(`[BOMBER] ${phone} done`);
            attacksCount--;
            socket.emit(ATTACKS, attacksCount);
        });
    });

    socket.emit(ATTACKS, attacksCount);
    socket.emit(SERVICES_COUNT, bomber.getCountOfServices());

    socket.on('disconnect', () => write('[SOCKET] disconnected'));
});

server.listen(process.env.PORT || PORT, () => success(`Сервер запущен на ${process.env.PORT || PORT} порту.`));