const db = require('../util/db'),
    controller = require('./base');

module.exports = (req, res) => controller({
    req,
    res,
    article: () => Promise.resolve('This is the local classes page'),
    data: req.params.state ? () => db.coursesInState(req.params.state) : () => db.coursesOffline(),
    slug: req.params.state ? `Drone Pilot Training Programs in ${req.params.state}` : 'All Drone Pilot Training Programs',
    view: 'classes'
});
