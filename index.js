const express = require('express'),
    app = express(),
    manila = require('manila')(),
    sqlite = require('sqlite'),
    gigs = require('./controllers/gigs'),
    localClasses = require('./controllers/local-classes'),
    onlineClasses = require('./controllers/online-classes'),
    index = require('./controllers/index'),
    bodyParser = require('body-parser'),
    expressAdmin = require('express-admin'),
    db = require('./util/db');

const initApp = admin => {

    db.init(sqlite);

    app.use('/admin', admin);

    app.get('/', (req, res) => index(res));

    app.get('/drone-pilot-jobs/:state?', gigs);

    app.get('/drone-license-classes/:state?', localClasses);

    app.get('/online-drone-classes', onlineClasses);

    app.use(express.static('static'));

    app.use(bodyParser.json());
    
    app.engine('mnla', manila);

    app.set('view engine', 'mnla');

    app.set('views', './views');

    app.listen(8000);

    console.log('listening on 8000');

};

const initAdmin = () => {

    expressAdmin.init({
        dpath: './admin/',
        config: require('./admin/config.json'),
        settings: require('./admin/settings.json'),
        custom: require('./admin/custom.json'),
        users: require('./admin/users.json')
    }, (err, admin) => {

        if (err) {

            return console.log(err);

        }

        initApp(admin);

    });

};

sqlite.open('../pilothound-db/pilothound.db').then(initAdmin);
