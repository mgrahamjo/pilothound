const request = require('./util/request'),
    cheerio = require('cheerio'),
    gigs = [];

let page = 1;

function getGigs(callback) {

    if (page) {

        return request({
            https: true,
            host: 'www.glassdoor.com',
            path: `/Job/uav-pilot-jobs-SRCH_KO0,9${page === 1 ? '' : '_IP' + page}.htm`,
            method: 'GET',
            headers: {
                'authority': 'www.glassdoor.com',
                'method': 'GET',
                'path': '/Job/uav-pilot-jobs-SRCH_KO0,9.htm',
                'scheme': 'https',
                'accept': 'text/html',
                'accept-language': 'en-US,en;q=0.8',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
                'upgrade-insecure-requests': 1
            }
        }).then((response) => {

            page++;

            const $ = cheerio.load(response);

            $('.jl').each((i, jl) => {

                jl = $(jl);

                const a = jl.find('a'),
                    source = jl.find('.empLoc').text().split(' –')[0],
                    state = jl.find('.loc').text().split(', ')[1];

                gigs.push({
                    title: a.text().trim(),
                    source: source ? source.trim() : undefined,
                    state: state ? state.trim() : undefined,
                    snippet: jl.find('.descSnippet').html(),
                    url: 'https://www.glassdoor.com' + a.attr('href')
                });

            });

            if ($('.pagingControls .next .disabled').length !== 0) {

                callback();

            } else {

                getGigs(callback);

            }

        }).catch(e => console.error(e));

    }

}

module.exports = data => new Promise(resolve => 

    getGigs(() => {

        console.log(`Got ${gigs.length} gigs from glassdoor.`);

        data.glassdoor = gigs;

        resolve(data);

    })

);
