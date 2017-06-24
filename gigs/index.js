const indeed = require('./indeed'),
    google = require('./google'),
    glassdoor = require('./glassdoor'),
    interlace = require('interlace-arrays'),
    save = require('./save');

indeed()
    .then(glassdoor)
    .then(google)
    .then(gigs => {

        const originalLength = gigs.indeed.length + gigs.google.length + gigs.glassdoor.length;

        gigs = interlace([gigs.indeed, gigs.google, gigs.glassdoor]).filter(gig => {

            return (gig.title + gig.snippet).match(/(drone|uav|aerial|pilot)/i);

        });

        console.log(`Filtered out ${originalLength - gigs.length} gigs.`);

        if (gigs.length > 100) {

            save(gigs);

        } else {

            console.log('Aborting: fewer than 100 gigs found.');

        }

    }).catch(e => console.error(e));
