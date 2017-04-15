const https = require('https');
const http = require('http');

module.exports = (options, data) => {

    options['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36';

    options.Connection = 'keep-alive';

    const protocall = options.https ? https : http;

    delete options.https;

    return new Promise((resolve, reject) => {

        const req = protocall.request(options, response => {

            let body = '';

            response.on('data', d => {
                body += d;
            });

            response.on('end', () => {

                console.log(`${response.statusCode}: ${response.statusMessage}`);

                resolve(JSON.parse(body));

            });

            response.on('error', e => {

                reject(e);

            });

        });

        req.write(data || '');

        req.end();

    });

};
