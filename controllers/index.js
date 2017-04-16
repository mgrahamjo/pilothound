module.exports = res => {

    res.render('index', {
        key: new Buffer(process.env.GOOGLE_KEY).toString('base64')
    });

};
