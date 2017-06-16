const fs = require('fs'),
    index = require('./index');

module.exports = (req, res) => 

    fs.appendFile('mailing-list.txt', '\n' + req.body.email, () => 

        index(req, res)

    );
