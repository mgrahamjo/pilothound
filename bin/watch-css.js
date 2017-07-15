const fs = require('fs'),
    spawn = require('child_process').spawn;

function copyStyles() {

    spawn('cp', ['static/style.css', 'static/dist/style.css'], {
        stdio: 'inherit'
    }).on('close', () => {

        console.log('copied styles to dist.');

    });

}

fs.watchFile('static/style.css', copyStyles);

copyStyles();
