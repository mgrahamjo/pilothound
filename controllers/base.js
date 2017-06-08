const paginate = require('../util/paginate');

module.exports = opts => {

    opts.article().then(article => 

        opts.data().then(items => {

            const data = paginate(opts.req, items);

            data.slug = opts.slug;

            data.bodyClass = opts.view;

            data.article = article[0].body;

            data.isGigsPage = opts.req.path === '/drone-pilot-jobs';

            opts.res.render(opts.view, data);

        })

    );

};
