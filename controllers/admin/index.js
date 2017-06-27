module.exports = (req, res) => {

    res.render('admin/index', {
        path: req.path
    });

};
