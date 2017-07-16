const request = require('./util/request'),
    gigs = [];

function getJobs(query) {

    return request({
        https: true,
        host: 'www.amazon.jobs',
        path: `/en/search?base_query=${query}&result_limit=100&sort=relevant`,
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Host': 'www.amazon.jobs',
            'Pragma': 'no-cache',
            'Referer': `https//www.amazon.jobs/en/search?base_query=${query}&result_limit=100&sort=relevant`,
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(response => {

        response.jobs.forEach(job => {

            let location = job.location;

            if (location.indexOf('US, ') === 0) {

                location = location.split(', ')[1];

                gigs.push({
                    title: job.title,
                    source: 'Amazon',
                    state: location,
                    snippet: job.description_short,
                    url: 'https://www.amazon.jobs' + job.job_path
                });

            }

        });

    });

}

module.exports = data => new Promise((resolve, reject) => {

    getJobs('drone')
        .then(() => getJobs('uav'))
        .then(() => {

            console.log(`Got ${gigs.length} gigs from amazon.`);

            data.amazon = gigs;

            resolve(data);

        }).catch(reject);

});
