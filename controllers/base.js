const paginate = require('../util/paginate');

module.exports = opts => {

    opts.data().then(items => {

        const data = paginate(opts.req, items);

        data.slug = opts.slug;

        opts.res.render(opts.view, data);

    });

};
