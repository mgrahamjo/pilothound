const request = require('./util/request'),
    craigslistStates = require('./util/craigslist-states'),
    serialize = require('./util/serialize'),
    params = {
        key: process.env.GOOGLE_KEY,
        cx: '004652178812819853463:8nwcspn0une',
        q: 'drone pilot needed OR uav pilot needed',
        num: 10,
        start: 1
    };

let gigs = [];

function getGigs(callback) {

    if (params.start < 101) {

        return request({
            https: true,
            host: 'www.googleapis.com',
            path: '/customsearch/v1?' + serialize(params),
            method: 'GET'
        }).then(results => {

            params.start += params.num;

            gigs = gigs.concat(results.items.map(gig => {

                return {
                    title: gig.title,
                    source: 'Craigslist',
                    state: craigslistStates[gig.displayLink.split('.')[0]],
                    snippet: gig.snippet.replace(/\\n/g, ''),
                    url: gig.link
                };

            }));

            getGigs(callback);

        });

    }

    callback();

}

module.exports = data => new Promise(resolve => 

    getGigs(() => {

        console.log(`Got ${gigs.length} gigs from google.`);

        data.google = gigs;

        resolve(data);

    })

);
