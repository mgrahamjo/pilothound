const constants = require('./constants');

module.exports = (req, items) => {

    const page = parseInt(req.query.page || 1);

    const start = page * 20 - 19;

    let path = req.path;

    if (path === constants.gigsUrl) {

        path = '/jobs';

    } else if (path === constants.classesUrl) {

        path = '/classes';

    }

    return {
        page,
        start,
        path,
        count: items.length,
        items: items.slice(start - 1, page * 20)
    };

};
