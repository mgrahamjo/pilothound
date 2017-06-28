const express = require('express'),
    app = express(),
    manila = require('manila')(),
    sqlite = require('sqlite'),
    article = require('./controllers/article'),
    bodyParser = require('body-parser'),
    constants = require('./util/constants'),
    db = require('./util/db'),
    newsletter = require('./controllers/newsletter'),
    page = require('./controllers/page');

sqlite.open('../pilothound-db/pilothound.db').then(() => {

    db.init(sqlite);

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static('static'));

    app.engine('mnla', manila);

    app.set('view engine', 'mnla');

    app.set('views', './views');

    // App controllers

    app.get('/', require('./controllers/index'));

    app.get('/about', page);

    app.get('/privacy', page);

    app.get('/terms', page);

    app.get(`${constants.gigsUrl}/:state?`, article);

    app.get(`${constants.classesUrl}/:state?`, article);

    app.get(`${constants.part107Url}/:state?`, article);

    app.get(constants.onlineClassesUrl, article);

    app.get(constants.gigsArticleUrl, article);

    app.get(constants.classesArticleUrl, article);

    app.get(constants.onlineClassesArticleUrl, article);

    app.get(constants.part107ArticleUrl, article);

    app.post('/', newsletter);

    // Admin controllers
    
    app.get('/admin', require('./controllers/admin/index'));

    app.get('/admin/schools', require('./controllers/admin/schools'));
    app.get('/admin/schools/:id?', require('./controllers/admin/edit-school'));
    app.post('/admin/schools', require('./controllers/admin/post-school'));

    app.get('/admin/courses', require('./controllers/admin/courses'));
    app.get('/admin/courses/:id?', require('./controllers/admin/edit-course'));
    app.post('/admin/courses', require('./controllers/admin/post-course'));

    app.get('/admin/blog', require('./controllers/admin/blog'));
    app.get('/admin/blog/:file?', require('./controllers/admin/edit-blog'));
    app.post('/admin/blog', require('./controllers/admin/post-blog'));

    app.listen(8000);

    console.log('listening on 8000');

});
