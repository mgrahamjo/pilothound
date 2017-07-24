const fs = require('fs');

module.exports = (req, res) => {

    const data = req.body;

    if (!data.file.match(/\.json$/)) {

        data.file += '.json';

    }

    const post = JSON.stringify({
        title: data.title,
        date: new Date(data.date),
        body: data.body
    });

    fs.writeFile('content/blog/' + data.file, post, () => res.redirect('blog'));

};
