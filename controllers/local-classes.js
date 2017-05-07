const db = require('../util/db'),
    controller = require('./base');

module.exports = (req, res) => controller({
    req,
    res,
    data: req.params.state ? () => db.coursesInState(req.params.state) : () => db.coursesOffline(),
    slug: req.params.state ? `Drone Pilot Classes in ${req.params.state}` : 'All In-person Drone Pilot Classes',
    view: 'classes'
});
