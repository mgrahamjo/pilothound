const request = require('./util/request'),
    cheerio = require('cheerio'),
    gigs = [];

module.exports = data => new Promise((resolve, reject) => {

    request({
        host: 'www.careerbuilder.com',
        path: '/jobs-uav',
        method: 'GET'
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
