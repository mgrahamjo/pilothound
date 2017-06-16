const express = require('express'),
    app = express(),
    manila = require('manila')(),
    sqlite = require('sqlite'),
    article = require('./controllers/article'),
    bodyParser = require('body-parser'),
    constants = require('./util/constants'),
    db = require('./util/db'),
    newsletter = require('./controllers/newsletter');

sqlite.open('../pilothound-db/pilothound.db').then(() => {

    db.init(sqlite);

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(express.static('static'));

    app.engine('mnla', manila);

    app.set('view engine', 'mnla');

    app.set('views', './views');

    app.get('/', (req, res) => require('./controllers/index')(res));

    app.get(`${constants.gigsUrl}/:state?`, article);

    app.get(`${constants.classesUrl}/:state?`, article);

    app.get(`${constants.part107Url}/:state?`, article);

    app.get(constants.onlineClassesUrl, article);

    app.get(constants.gigsArticleUrl, article);

    app.get(constants.classesArticleUrl, article);

    app.get(constants.onlineClassesArticleUrl, article);

    app.get(constants.part107ArticleUrl, article);

    app.post('/newsletter-signup', newsletter);

    app.listen(8000);

    console.log('listening on 8000');

});
