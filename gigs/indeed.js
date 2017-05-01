const request = require('./util/request'),
    serialize = require('./util/serialize'),
    params = {
        publisher: process.env.INDEED_KEY,
        v: 2,
        format: 'json',
        q: '(drone OR uav) pilot',
        limit: 100
    };

module.exports = () => new Promise((resolve, reject) => {

    request({
        host: 'api.indeed.com',
        path: '/ads/apisearch?' + serialize(params),
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

    ).then(gigs => {

        console.log(`Got ${gigs.length} gigs from indeed.`);

        resolve({
            indeed: gigs
        });

    }).catch(reject);

});
