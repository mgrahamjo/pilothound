const db = require('../../util/db');

module.exports = (req, res) => {

    db.courses().then(data => {

        res.render('admin/search', {
            path: req.path,
            h1: 'Courses',
            columns: [
                'id',
                'school',
                'name',
                'price',
                'online',
                'url',
                'headline',
                'description',
                'features',
                'level'
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
