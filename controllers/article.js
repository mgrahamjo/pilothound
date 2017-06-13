const db = require('../util/db'),
    controller = require('./base'),
    swap = require('../util/swap'),
    constants = require('../util/constants');

module.exports = (req, res) => controller({
    req,
    res,
    article: () => db.article(swap(req.path, {
        [constants.gigsUrl]: () => 1,
        [constants.classesUrl]: () => 2,
        [constants.onlineClassesUrl]: () => 4,
        [constants.part107Url]: () => 3
    })),
    data: swap(req.path, {
        [constants.gigsUrl]: () => db.gigs,
        [constants.classesUrl]: () => db.coursesOffline,
        [constants.onlineClassesUrl]: () => db.coursesOnline,
        [constants.part107Url]: () => db.coursesOnline
    }),
    slug: swap(req.path, {
        [constants.gigsUrl]: () => 'All Drone Pilot Jobs',
        [constants.classesUrl]: () => 'In-person UAV Training Programs',
        [constants.onlineClassesUrl]: () => 'All Online Drone Pilot Classes',
        [constants.part107Url]: () => 'Online UAV Pilot Training'
    }),
    view: 'article'
});
