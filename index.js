const express = require('express'),
    app = express(),
    manila = require('manila')(),
    sqlite = require('sqlite'),
    article = require('./controllers/article'),
    bodyParser = require('body-parser'),
    expressAdmin = require('express-admin'),
    constants = require('./util/constants'),
    db = require('./util/db');

const initApp = admin => {

    db.init(sqlite);

    app.use('/admin', admin);

    app.get('/', (req, res) => require('./controllers/index')(res));

    app.get('/jobs/:state?', require('./controllers/gigs'));

    app.get('/classes/:state?', require('./controllers/classes'));

    app.get(constants.gigsUrl, article);

    app.get(constants.classesUrl, article);

    app.get(constants.onlineClassesUrl, article);

    app.get(constants.part107Url, article);

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
