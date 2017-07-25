const fs = require('fs');

module.exports = (req, res) => {

    fs.readFile(`content/blog/${req.params.post}.json`, (err, file) => {

        if (err) {

            console.error(err);

        }

        const post = JSON.parse(file);

        res.render('post', {
            bodyClass: 'article',
            canonical: req.path,
            slug: post.title,
            title: post.title,
            date: new Date(post.date).toDateString(),
            body: post.body,
            cacheBust: Date.now()
        });

    });

};
