const escape = require('../util/escape');

let sql;

const COURSE_FIELDS = 'course.url, course.name, course.headline, course.features, school.name AS school, school.logo, school.color';

const GIG_FIELDS = 'gig.url, gig.title, gig.snippet, gig.source';

const mod = (...args) => resolve => {

    const resolved = [];

    args.forEach(promise => promise.then(data => {

        resolved.push(data);

        if (resolved.length === args.length) {

            resolve.apply(null, resolved);

        }
    
    }).catch(e => console.error(e)));

};

mod.init = db => {

    sql = query => db.all(query).catch(e => console.error(e));

};

mod.gigs = () => sql(`
    SELECT ${GIG_FIELDS} FROM gig
`);

mod.gigsInState = state => sql(`
    SELECT ${GIG_FIELDS} FROM gig
    LEFT JOIN state_gig 
    ON gig.id=state_gig.gig_id
    WHERE state IS "${escape(state)}"
`);

mod.coursesInState = state => sql(`
    SELECT ${COURSE_FIELDS} FROM course
    JOIN state_course 
        ON course.id = state_course.course_id
    JOIN school
        ON course.school = school.id
    WHERE state_course.state IS "${escape(state)}"
`);

mod.coursesOnline = () => sql(`
    SELECT ${COURSE_FIELDS} FROM course
    JOIN school
        ON course.school = school.id
    WHERE course.online IS 1
`);

mod.coursesOffline = () => sql(`
    SELECT ${COURSE_FIELDS} FROM course
    JOIN school
        ON course.school = school.id
    WHERE course.online IS NOT 1
`);

mod.prepCoursesInState = state => sql(`
    SELECT ${COURSE_FIELDS} FROM course
    JOIN state_course 
        ON course.id = state_course.course_id
    JOIN school
        ON course.school = school.id
    WHERE course.level IS "P"
        AND (state_course.state IS "${escape(state)}"
        OR course.online IS 1)
`);

mod.prepCourses = () => sql(`
    SELECT ${COURSE_FIELDS} FROM course
    JOIN school
        ON course.school = school.id
    WHERE course.level IS "P"
`);

mod.article = id => sql(`
    SELECT body FROM article
    WHERE article.id IS ${id}
`);

module.exports = mod;
