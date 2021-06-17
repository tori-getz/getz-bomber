
const users = require('./users.json');
const randToken = require('random-token');
const tymlogger = require('tymlogger');

const logger = new tymlogger();

const generateUsers = () => {
    let newUsers = [];

    logger.success('[GRANTED USERS]');

    for (let user of users) {
        const { login, password } = user;
        const newUser = {
            login,
            password,
            token: randToken(32)
        };

        logger.write(`${newUser.login} : ${newUser.password} -> ${newUser.token}`);

        newUsers.push(newUser);
    }

    return newUsers;
}

module.exports = generateUsers;
