const indeed = require('./indeed'),
    google = require('./google'),
    glassdoor = require('./glassdoor'),
    dronebase = require('./dronebase'),
    army = require('./army'),
    interlace = require('interlace-arrays'),
    save = require('./save');

indeed()
    .then(glassdoor)
    .then(google)
    .then(dronebase)
    .then(army)
    .then(gigs => {

        const originalLength = gigs.indeed.length + gigs.google.length + gigs.glassdoor.length;

        const dynamicGigs = interlace([gigs.indeed, gigs.google, gigs.glassdoor]).filter(gig => {

            return (gig.title + gig.snippet).match(/(drone|uav|aerial|pilot)/i);

        });

        console.log(`Filtered out ${originalLength - dynamicGigs.length} gigs.`);

        if (dynamicGigs.length > 200) {

            save(dynamicGigs.concat(gigs.static));

        } else {

            console.log('Aborting: not enough gigs found.');

        }

    }).catch(e => console.error(e));
