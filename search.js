const request = require('./util/request'),
    states = require('./util/states'),
    serialize = require('./util/serialize'),
    db = require('sqlite'),
    interlace = require('interlace-arrays'),
    escape = require('./util/escape'),
    googleParams = {
        key: process.env.GOOGLE_KEY,
        cx: '004652178812819853463:8nwcspn0une',
        q: 'drone pilot needed OR uav pilot needed',
        num: 10,
        start: 1
    },
    indeedParams = {
        publisher: process.env.INDEED_KEY,
        v: 2,
        format: 'json',
        q: '(drone OR uav) pilot',
        limit: 100
    },
    googleGigs = [];

let i = 0,
    gigs,
    indeedGigs;

function saveGigs() {

    if (i < gigs.length) {

        const gig = gigs[i];

        i++;

        return db.run(`
            INSERT INTO gig (
                title,
                source,
                snippet,
                url)
            VALUES (
                "${escape(gig.title)}",
                "${escape(gig.source)}",
                "${escape(gig.snippet.replace(/\\n/g, ''))}",
                "${escape(gig.url)}");`
        ).then(() => 

            gig.state ? db.run(`
                INSERT INTO state_gig (
                    state,
                    gig_id)
                VALUES (
                    "${escape(gig.state)}",
                    "${i}");`) : Promise.resolve()

        ).then(saveGigs)
        .catch(err => {

            console.error(err);

            console.log(JSON.stringify(gig));

        });

    }

    console.log(`Saved ${gigs.length} gigs.`);

}

function getGoogleGigs() {

    if (googleParams.start < 101) {

        return request({
            https: true,
            host: 'www.googleapis.com',
            path: '/customsearch/v1?' + serialize(googleParams),
            method: 'GET'
        }).then(data => {

            googleParams.start += googleParams.num;

            return data.items.forEach(gig => {

                googleGigs.push({
                    title: gig.title,
                    source: 'Craigslist',
                    state: states[gig.displayLink.split('.')[0]],
                    snippet: gig.snippet.replace(/\\n/g, ''),
                    url: gig.link
                });

            });

        })
        .then(getGoogleGigs)
        .catch(err => console.error(err));

    }

    console.log(`Got ${googleGigs.length} gigs from google.`);

    gigs = interlace([indeedGigs, googleGigs]);

    if (gigs.length > 100) {

        db.exec(`DELETE FROM gig;    
                DELETE FROM sqlite_sequence WHERE name = 'gig';
                DELETE FROM state_gig;    
                DELETE FROM sqlite_sequence WHERE name = 'state_gig';`)
            .then(saveGigs)
            .catch(err => console.error(err));

    } else {

        console.log('Aborting: fewer than 100 gigs found.');

    }

}

function getIndeedGigs() {

    request({
        host: 'api.indeed.com',
        path: '/ads/apisearch?' + serialize(indeedParams),
        method: 'GET'
    }).then(data => 

        data.results
            .filter(gig => !gig.expired)
            .map(gig => {

                return {
                    title: gig.jobtitle,
                    source: gig.company,
                    state: gig.state,
                    snippet: gig.snippet,
                    url: gig.url
                };

            })

    ).then(_indeedGigs => {

        indeedGigs = _indeedGigs;

        console.log(`Got ${indeedGigs.length} gigs from indeed.`);

        return getGoogleGigs();

    }).catch(err => console.error(err));

}

db.open('./pilothound.db')
    .then(getIndeedGigs)
    .catch(err => console.error(err));
