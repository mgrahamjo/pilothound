const db = require('../util/db');

module.exports = (req, res) => {

    const page = parseInt(req.query.page || 1);

    const start = (page - 1) * 20;

    const location = req.params.state ? ` in ${req.params.state}` : '';

    const render = gigs => res.render('gigs', {
        location,
        page,
        slug: 'Drone Pilot Jobs' + location,
        gigs: gigs.slice(start, page * 20), 
        count: gigs.length,
        start: start + 1,
        path: req.path
    });

    if (req.params.state) {

        db.gigsInState(req.params.state).then(render);

    } else {

        db.gigs().then(render);

    }

};
