const db = require('../util/db'),
    controller = require('./base'),
    swap = require('../util/swap');

module.exports = (req, res) => controller({
    req,
    res,
    article: () => db.article(swap(req.path, {
        '/drone-pilot-jobs': () => 1,
        '/drone-license-classes': () => 2,
        '/online-drone-classes': () => 4,
        '/part-107-training': () => 3
    })),
    data: swap(req.path, {
        '/drone-pilot-jobs': () => db.gigs,
        '/drone-license-classes': () => db.coursesOffline,
        '/online-drone-classes': () => db.coursesOnline,
        '/part-107-training': () => db.coursesOnline
    }),
    slug: swap(req.path, {
        '/drone-pilot-jobs': () => 'All Drone Pilot Jobs',
        '/drone-license-classes': () => 'In-person UAV Training Programs',
        '/online-drone-classes': () => 'All Online Drone Pilot Classes',
        '/part-107-training': () => 'Online UAV Pilot Training'
    }),
    view: 'article'
});
