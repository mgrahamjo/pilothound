module.exports = (res, db) => {

    db.exec('SELECT * FROM gigs LIMIT 20').then(gigs => 

        res.render('index', {gigs})

    );

};
