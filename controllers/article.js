const db = require('../util/db'),
    base = require('./base'),
    constants = require('../util/constants');

const config = state => {
    return {
        [constants.gigsUrl]: {
            article: () => Promise.resolve('This is the jobs page'),
            data: state ? () => db.gigsInState(state) : () => db.gigs(),
            slug: state ? `Drone Pilot Jobs in ${state}` : 'All Drone Pilot Jobs',
            canonical: constants.gigsArticleUrl,
            isGigsPage: true,
            searchPath: constants.gigsUrl
        },
        [constants.classesUrl]: {
            article: () => Promise.resolve(),
            data: state ? () => db.coursesInState(state) : () => db.coursesOffline(),
            slug: state ? `Drone Pilot Training Programs in ${state}` : 'All In-Person Drone Pilot Training Programs',
            canonical: constants.classesArticleUrl,
            searchPath: constants.classesUrl
        },
        [constants.onlineClassesUrl]: {
            article: () => Promise.resolve(),
            data: () => db.coursesOnline(),
            slug: 'All Online Drone Pilot Training Programs',
            canonical: constants.onlineClassesArticleUrl,
            isOnlineClassesPage: true,
            searchPath: constants.onlineClassesUrl
        },
        [constants.part107Url]: {
            article: () => Promise.resolve(),
            data: state ? () => db.prepCoursesInState(state) : () => db.prepCourses(),
            slug: state ? `Part 107 Test Prep Courses in ${state}` : 'All Part 107 Test Prep Courses',
            canonical: constants.part107ArticleUrl,
            searchPath: constants.part107Url
        },
        [constants.gigsArticleUrl]: {
            article: () => db.article(1),
            data: db.gigs,
            slug: 'All Drone Pilot Jobs',
            canonical: constants.gigsArticleUrl,
            isGigsPage: true,
            searchPath: constants.gigsUrl
        },
        [constants.classesArticleUrl]: {
            article: () => db.article(2),
            data: db.coursesOffline,
            slug: 'In-person UAV Training Programs',
            canonical: constants.classesArticleUrl,
            searchPath: constants.classesUrl
        },
        [constants.onlineClassesArticleUrl]: {
            article: () => db.article(4),
            data: db.coursesOnline,
            slug: 'All Online Drone Pilot Classes',
            canonical: constants.onlineClassesArticleUrl,
            isOnlineClassesPage: true,
            searchPath: constants.onlineClassesUrl
        },
        [constants.part107ArticleUrl]: {
            article: () => db.article(3),
            data: db.prepCourses,
            slug: 'Part 107 Remote Pilot Test Prep Courses',
            canonical: constants.part107ArticleUrl,
            searchPath: constants.part107Url
        }
    };
};

module.exports = (req, res) => {

    const state = req.params.state ? req.params.state.toUpperCase() : undefined,
        basePath = '/' + req.path.split('/')[1];

    return base(Object.assign({
        req,
        res,
        view: 'article'
    }, config(state)[basePath]));

};
