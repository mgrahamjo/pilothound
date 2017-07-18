// http://api.indeed.com/ads/apisearch?publisher=670154439198074&v=2&format=json&limit=100&q=(drone%20OR%20uav)%20pilot
const request = require('./util/request'),
    serialize = require('./util/serialize'),
    params = {
        publisher: process.env.INDEED_KEY,
        v: 2,
        format: 'json',
        q: '(drone OR uav) pilot',
        limit: 100,
        start: 0
    },
    gigs = [];

function getGigs(resolve, reject) {

    request({
        host: 'api.indeed.com',
        path: '/ads/apisearch?' + serialize(params),
        method: 'GET'
    }).then(data => {

        data.results
            .filter(gig => !gig.expired)
            .forEach(gig => gigs.push({
                title: gig.jobtitle,
                source: gig.company,
                state: gig.state,
                snippet: gig.snippet,
                url: gig.url
            }));

        if (params.start + data.results.length < data.totalResults) {

            params.start += data.results.length;

            getGigs(resolve);

        } else {

            resolve();

        }

    }).catch(reject);

}

module.exports = () => new Promise((resolve, reject) => {

    getGigs(() => {

        console.log(`Got ${gigs.length} gigs from indeed.`);

        resolve({
            indeed: gigs
        });

    }, reject);

});
