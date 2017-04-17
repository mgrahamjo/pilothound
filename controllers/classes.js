const db = require('../util/db');

module.exports = (req, res) => {

    const location = req.params.state ? ` in ${req.params.state}` : '';

    const render = (local, online) => res.render('classes', {
        location,
        slug: 'Drone Pilot Classes' + location,
        classes: {
            local: local.slice(0, 20), 
            online: online.slice(0, 20)
        },
        count: {
            local: local.length,
            online: online.length,
            total: local.length + online.length
        }
    });

    if (req.params.state) {

        db(
            db.coursesInState(req.params.state),
            db.coursesOnline()
        )(render);

    } else {

        db(
            db.coursesOffline(),
            db.coursesOnline()
        )(render);

    }

};
