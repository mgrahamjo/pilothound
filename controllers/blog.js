const fs = require('fs');

module.exports = (req, res) => {

    fs.readdir('content/blog', (err, files) => {

        if (err) {

            console.error(err);

            files = [];

        }

        Promise.all(files.map(file => new Promise((resolve, reject) => {

            fs.readFile('content/blog/' + file, (e, data) => {

                if (e) {

                    return reject();

                }

                const post = JSON.parse(data.toString());

                post.url = file.replace('.json', '');
                post.date = new Date(post.date).toDateString();
                post.snippet = post.body.substring(3, 190).replace(/(<\/?p>)/g, ' ');

                resolve(post);

            });

        }))).then(posts => {

            res.render('blog', {
                posts,
                bodyClass: 'article',
                canonical: '/blog',
                slug: 'News, Tips, and Insights for Drone Pilots',
                state: 'all',
                description: 'The PilotHound blog is a resource for current and aspiring professionals in the UAV industry. Tune in regularly to catch our bi-monthly posts.'
            });

        }).catch(e => console.error(e));

    });

};
