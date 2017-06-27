const db = require('../../util/db');

module.exports = (req, res) => {

    db.schools().then(data => {

        res.render('admin/search', {
            path: req.path,
            h1: 'Schools',
            columns: [
                'id',
                'name',
                'url',
                'email',
                'phone',
                'online',
                'address',
                'logo',
                'color',
                'description'
            ],
            rows: data.map(row => Object.keys(row).map(key => {
                return {
                    key,
                    value: row[key]
                };
            }))
        });

    });

};
