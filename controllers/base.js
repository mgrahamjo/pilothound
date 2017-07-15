const paginate = require('../util/paginate');

module.exports = opts => {

    opts.data().then(items => {

        const data = paginate(opts.req, items, opts.searchPath + '/' + opts.state);

        data.slug = opts.slug;

        data.canonical = opts.canonical;

        data.isGigsPage = opts.isGigsPage || false;

        data.isOnlineClassesPage = opts.isOnlineClassesPage || false;

        data.state = opts.state || 'all';

        data.searchPath = opts.searchPath;

        data.bodyClass = 'article';

        data.article = opts.article;

        data.sidebar = opts.sidebar;

        data.description = opts.description;

        opts.res.render(opts.view, data);

    });

};
