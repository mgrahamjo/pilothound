module.exports = (req, items) => {

    const page = parseInt(req.query.page || 1);

    const start = page * 20 - 19;

    return {
        page,
        start,
        count: items.length,
        items: items.slice(start - 1, page * 20),
        path: req.path
    };

};
