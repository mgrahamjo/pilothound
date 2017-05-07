const db = require('../util/db'),
    controller = require('./base');

module.exports = (req, res) => controller({
    req,
    res,
    data: () => db.coursesOnline(),
    slug: 'Online Drone Pilot Classes',
    view: 'classes'
});
