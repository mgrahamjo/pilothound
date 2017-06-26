const escape = require('../util/escape');

const COURSE_FIELDS = 'course.url, course.name, course.headline, course.features, school.name AS school, school.logo, school.color';

const GIG_FIELDS = 'gig.url, gig.title, gig.snippet, gig.source';

let sql;

module.exports = {

    init: db => {

        sql = query => db.all(query).catch(e => console.error(e));

    },

    gigs: () => sql(`
        SELECT ${GIG_FIELDS} FROM gig
    `),

    gigsInState: state => sql(`
        SELECT ${GIG_FIELDS} FROM gig
        LEFT JOIN state_gig 
            ON gig.id=state_gig.gig_id
        WHERE state IS "${escape(state)}"
    `),

    coursesInState: state => sql(`
        SELECT ${COURSE_FIELDS} FROM course
        JOIN state_course 
            ON course.id = state_course.course_id
        JOIN school
            ON course.school = school.id
        WHERE state_course.state IS "${escape(state)}"
    `),

    coursesOnline: () => sql(`
        SELECT ${COURSE_FIELDS} FROM course
        JOIN school
            ON course.school = school.id
        WHERE course.online IS 1
    `),

    coursesOffline: () => sql(`
        SELECT ${COURSE_FIELDS} FROM course
        JOIN school
            ON course.school = school.id
        WHERE course.online IS NOT 1
    `),

    prepCoursesInState: state => sql(`
        SELECT ${COURSE_FIELDS} FROM course
        JOIN state_course 
            ON course.id = state_course.course_id
        JOIN school
            ON course.school = school.id
        WHERE course.level IS "P"
            AND (state_course.state IS "${escape(state)}"
            OR course.online IS 1)
    `),

    prepCourses: () => sql(`
        SELECT ${COURSE_FIELDS} FROM course
        JOIN school
            ON course.school = school.id
        WHERE course.level IS "P"
    `)

};
