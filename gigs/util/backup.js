const spawn = require('child_process').spawn;

const exec = (cmd, args) => new Promise(resolve => spawn(cmd, args, {stdio: 'inherit'}).on('close', resolve));

module.exports = () => {

    process.chdir('../pilothound-db');

    exec('git', ['add', '-A']).then(() => 

        exec('git', ['commit', '-m', 'Auto backup ' + new Date().toJSON().substring(0, 10)])

    );

};
