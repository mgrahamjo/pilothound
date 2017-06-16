const fs = require('fs');

module.exports = (req, res) => 

    fs.appendFile('mailing-list.txt', '\n' + req.body.email, () => 

        res.redirect('/')

    );
