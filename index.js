const express = require('express'),
    app = express(),
    manila = require('manila')(),
    db = require('sqlite'),
    gigs = require('./controllers/gigs'),
    index = require('./controllers/index'),
    bodyParser = require('body-parser'),
    expressAdmin = require('express-admin');

const initApp = admin => {

    app.use('/admin', admin);

    app.get('/', (req, res) => index(res));

    app.get('/gigs', (req, res) => gigs(res, db));

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

db.open('../pilothound-db/pilothound.db').then(initAdmin);
