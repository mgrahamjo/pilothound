const db = require('../util/db'),
    controller = require('./base');

module.exports = (req, res) => controller({
    req,
    res,
    data: req.params.state ? () => db.gigsInState(req.params.state) : () => db.gigs(),
    slug: req.params.state ? `Drone Pilot Jobs in ${req.params.state}` : 'All Drone Pilot Jobs',
    view: 'gigs'
});
