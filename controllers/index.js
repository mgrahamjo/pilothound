module.exports = (req, res) => {

    res.render('index', {
        slug: 'Drone Pilot Jobs & UAV License Training Classes',
        key: new Buffer(process.env.GOOGLE_KEY).toString('base64'),
        canonical: '',
        state: 'all',
        success: req.body && req.body.email,
        bodyClass: 'home',
        description: 'Browse drone pilot job listings, online drone courses, and local UAV training classes with the web\'s most comprehensive database for aspiring UAV professionals.',
        cacheBust: Date.now()
    });

};
