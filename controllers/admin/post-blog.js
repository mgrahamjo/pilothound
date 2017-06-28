const fs = require('fs');

module.exports = (req, res) => {

    const data = req.body;

    if (!data.file.match(/\.json$/)) {

        data.file += '.json';

    }

    const post = `{
    "title": "${data.title}",
    "date": "${new Date(data.date).toJSON()}",
    "body": "${data.body}"
}`;

    fs.writeFile('content/blog/' + data.file, post, () => res.redirect('blog'));

};
