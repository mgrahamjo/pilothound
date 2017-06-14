module.exports = (req, items, path) => {

    const page = parseInt(req.query.page || 1);

    const start = page * 20 - 19;

    return {
        page,
        start,
        path,
        count: items.length,
        items: items.slice(start - 1, page * 20)
    };

};
