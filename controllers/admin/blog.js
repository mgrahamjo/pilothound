const fs = require('fs');

module.exports = (req, res) => {

    fs.readdir('content/blog', (err, files) => {

        if (err) {

            console.error(err);

            files = [];

        }

        res.render('admin/search', {
            path: req.path,
            h1: 'Blog',
            columns: [
                'file',
                'title',
                'date',
                'body'
            ],
            rows: files.map(file => {

                const post = JSON.parse(fs.readFileSync('content/blog/' + file));

                return [
                    {
                        key: 'file',
                        value: file
                    }, {
                        key: 'title',
                        value: post.title
                    }, {
                        key: 'date',
                        value: new Date(post.date).toDateString()
                    }, {
                        key: 'body',
                        value: post.body
                    }
                ];

            })
        });

    });

};
