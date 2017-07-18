const request = require('./util/request'),
    cheerio = require('cheerio'),
    gigs = [];

module.exports = data => new Promise((resolve, reject) => {

    request({
        host: 'www.careerbuilder.com',
        path: '/jobs-drone-pilot',
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'deflate',
            'Accept-Language': 'en-US,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Host': 'www.careerbuilder.com',
            'Pragma': 'no-cache'
        }
    }).then(response => {

        const $ = cheerio.load(response);

        $('.job-row').each((i, jobRow) => {

            jobRow = $(jobRow);

            gigs.push({
                title: jobRow.find('.job-title a').text().trim(),
                source: jobRow.find('.job-text [data-company-did]').text().trim() || 'confidential',
                state: jobRow.find('.columns.end h4:first-child').text().split(', ').pop().trim() || undefined,
                snippet: jobRow.find('.job-description').text().trim(),
                url: 'http://www.careerbuilder.com' + jobRow.find('.job-title a').attr('href')
            });

        });

    }).then(() => {

        console.log(`Got ${gigs.length} gigs from careerbuilder.`);

        data.careerbuilder = gigs;

        resolve(data);

    }).catch(reject);

});
