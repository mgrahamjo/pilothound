const indeed = require('./indeed'),
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
    .then(dronebase)
    .then(army)
    .then(gigs => {

        let dynamicGigs = interlace([
            gigs.indeed, 
            gigs.glassdoor,
            gigs.careerbuilder,
            gigs.amazon
        ]);

        const originalLength = dynamicGigs.length;

        dynamicGigs = dynamicGigs.filter(gig => {

            const content = gig.title + gig.snippet;

            return content.match(/(drone|uav|aerial|pilot)/i)
                && !content.match(/software\s(engineer|developer)/i);

        });

        console.log(`Filtered out ${originalLength - dynamicGigs.length} gigs.`);

        const allGigs = dynamicGigs.concat(gigs.static);

        if (allGigs.length > 350) {

            save(allGigs);

        } else {

            console.log('Aborting: not enough gigs found.');

        }

    }).catch(e => console.error(e));
