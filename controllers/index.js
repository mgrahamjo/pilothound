module.exports = res => {

    res.render('index', {
        slug: 'Drone Pilot Jobs & UAV License Training Classes',
        key: new Buffer(process.env.GOOGLE_KEY).toString('base64'),
        canonical: ''
    });

};
