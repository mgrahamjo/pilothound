const indeed = require('./indeed'),
    google = require('./google'),
    glassdoor = require('./glassdoor'),
    dronebase = require('./dronebase'),
    army = require('./army'),
    interlace = require('interlace-arrays'),
    save = require('./save'),
    careerbuilder = require('./careerbuilder'),
    amazon = require('./amazon');

indeed()
    .then(glassdoor)
    .then(careerbuilder)
    .then(amazon)
    .then(google)
    .then(dronebase)
    .then(army)
    .then(gigs => {

        let dynamicGigs = interlace([
            gigs.indeed, 
            gigs.glassdoor,
            gigs.careerbuilder,
            gigs.amazon,
            gigs.google
        ]);

        const originalLength = dynamicGigs.length;

        dynamicGigs = dynamicGigs.filter(gig => (gig.title + gig.snippet).match(/(drone|uav|aerial|pilot)/i));

        console.log(`Filtered out ${originalLength - dynamicGigs.length} gigs.`);

        const allGigs = dynamicGigs.concat(gigs.static);

        if (allGigs.length > 300) {

            save(allGigs);

        } else {

            console.log('Aborting: not enough gigs found.');

        }

    }).catch(e => console.error(e));
