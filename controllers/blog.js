const fs = require('fs');

module.exports = (req, res) => {

    fs.readdir('content/blog', (err, files) => {

        if (err) {

            console.error(err);

            files = [];

        }

        res.render('blog', {
            posts: files.map(file => {
                // TODO: Promise.all
                const post = JSON.parse(fs.readFileSync('content/blog/' + file));

                return {
                    title: post.title,
                    url: file.replace('.json', ''),
                    date: new Date(post.date).toDateString(),
                    snippet: post.body.substring(3, 190).replace(/(<\/?p>)/g, ' ')
                };

            }),
            bodyClass: 'article',
            canonical: '/blog',
            slug: 'News, Tips, and Insights for Drone Pilots',
            state: 'all',
            description: 'The PilotHound blog is a resource for current and aspiring professionals in the UAV industry. Tune in regularly to catch our bi-monthly posts.',
            cacheBust: Date.now()
        });

    });

};
