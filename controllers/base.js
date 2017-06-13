const paginate = require('../util/paginate');

module.exports = opts => {

    opts.article().then(article => 

        opts.data().then(items => {

            const data = paginate(opts.req, items);

            data.slug = opts.slug;

            data.bodyClass = opts.view;

            data.article = article[0].body;

            data.path = opts.req.path.substring(1);

            opts.res.render(opts.view, data);

        })

    );

};
