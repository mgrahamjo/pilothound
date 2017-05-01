const indeed = require('./indeed'),
    google = require('./google'),
    glassdoor = require('./glassdoor'),
    interlace = require('interlace-arrays'),
    save = require('./save');

indeed()
    .then(google)
    .then(glassdoor)
    .then(gigs => {

        gigs = interlace([gigs.indeed, gigs.google, gigs.glassdoor]);

        if (gigs.length > 100) {

            save(gigs);

        } else {

            console.log('Aborting: fewer than 100 gigs found.');

        }

    }).catch(e => console.error(e));
