const paginate = require('../util/paginate');

module.exports = opts => {

    opts.article().then(article => 

        opts.data().then(items => {

            const data = paginate(opts.req, items, opts.searchPath);

            data.slug = opts.slug;

            data.canonical = opts.canonical;

            data.isGigsPage = opts.isGigsPage || false;

            data.isOnlineClassesPage = opts.isOnlineClassesPage || false;

            data.state = opts.state || 'all';

            data.searchPath = opts.searchPath;

            data.bodyClass = 'article';

            data.article = article ? article[0].body : '';

            opts.res.render(opts.view, data);

        })

    );

};
