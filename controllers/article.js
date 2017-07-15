const db = require('../util/db'),
    base = require('./base'),
    constants = require('../util/constants');

const config = state => {
    return {
        [constants.gigsUrl]: {
            data: state ? () => db.gigsInState(state) : () => db.gigs(),
            slug: state ? `Drone Industry Jobs in ${state}` : 'Jobs in the Drone Industry',
            canonical: constants.gigsArticleUrl,
            isGigsPage: true,
            searchPath: constants.gigsUrl,
            description: `Our job listings for drone pilots, UAV professionals, and UAS engineers${state ? ' in ' + state : ''} are refreshed each day. Apply for your dream job before the position is filled.`
        },
        [constants.classesUrl]: {
            data: state ? () => db.coursesInState(state) : () => db.coursesOffline(),
            slug: state ? `Drone Pilot Training Programs in ${state}` : 'All In-Person Drone Pilot Training Programs',
            canonical: constants.classesArticleUrl,
            searchPath: constants.classesUrl,
            description: `Looking for UAV training programs${state ? ' in ' + state : ''}? Pilothound has amassed the largest database of drone pilot training and Unmanned Aerial Science degrees anywhere.`
        },
        [constants.onlineClassesUrl]: {
            data: () => db.coursesOnline(),
            slug: 'All Online UAV Pilot Training Programs',
            canonical: constants.onlineClassesArticleUrl,
            isOnlineClassesPage: true,
            searchPath: constants.onlineClassesUrl,
            description: 'Online drone classes are the quickest and easiest way to prepare for a certification or remote pilot license. Check out our comprehensive course listings.'
        },
        [constants.part107Url]: {
            data: state ? () => db.prepCoursesInState(state) : () => db.prepCourses(),
            slug: state ? `Part 107 Test Prep Courses in ${state}` : 'All Part 107 Test Prep Courses',
            canonical: constants.part107ArticleUrl,
            searchPath: constants.part107Url,
            description: 'The FAA Part 107 remote pilot knowledge exam is the most difficult hurdle to becoming a licensed drone pilot. These courses will have you prepared in no time.'
        },
        [constants.gigsArticleUrl]: {
            article: require('../content/jobs'),
            data: db.gigs,
            slug: 'Jobs for Drone Pilots and UAV Experts',
            canonical: constants.gigsArticleUrl,
            isGigsPage: true,
            searchPath: constants.gigsUrl,
            sidebar: true,
            description: 'Jobs and salaries in the UAV industry are on the rise. Check out some current opportunities for drone pilots and UAV engineers in our comprehensive listings.'
        },
        [constants.classesArticleUrl]: {
            article: require('../content/local-training'),
            data: db.coursesOffline,
            slug: 'In-person UAV Training Programs',
            canonical: constants.classesArticleUrl,
            searchPath: constants.classesUrl,
            sidebar: true,
            description: 'Schools around the nation are launching UAS degree programs. Find certificates and associate, bachelor, and masters degrees to prepare you for a UAV career.'
        },
        [constants.onlineClassesArticleUrl]: {
            article: require('../content/online-classes'),
            data: db.coursesOnline,
            slug: 'All Online Drone Pilot Classes',
            canonical: constants.onlineClassesArticleUrl,
            isOnlineClassesPage: true,
            searchPath: constants.onlineClassesUrl,
            sidebar: true,
            description: 'Online drone classes are the quickest and easiest way to prepare for a certification or remote pilot license. Check out our comprehensive course listings.'
        },
        [constants.part107ArticleUrl]: {
            article: require('../content/part-107'),
            data: db.prepCourses,
            slug: 'Part 107 Remote Pilot Test Prep Courses',
            canonical: constants.part107ArticleUrl,
            searchPath: constants.part107Url,
            sidebar: true,
            description: 'The FAA Part 107 remote pilot knowledge exam is the most difficult hurdle to becoming a licensed drone pilot. These courses will have you prepared in no time.'
        }
    };
};

module.exports = (req, res) => {

    const state = req.params.state ? req.params.state.toUpperCase() : '',
        basePath = '/' + req.path.split('/')[1];

    return base(Object.assign({
        req,
        res,
        state,
        view: 'article'
    }, config(state)[basePath]));

};
