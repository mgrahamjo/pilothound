const db = require('sqlite'),
    escape = require('../util/escape'),
    backup = require('./util/backup');

let i = 0,
    gigs;

function save() {

    if (i < gigs.length) {

        const gig = gigs[i];

        i++;

        return db.run(`
            INSERT INTO gig (
                title,
                source,
                snippet,
                url)
            VALUES (
                "${escape(gig.title)}",
                "${escape(gig.source)}",
                "${escape(gig.snippet.replace(/\\n/g, ''))}",
                "${escape(gig.url)}");`
        ).then(() => 

            gig.state ? db.run(`
                INSERT INTO state_gig (
                    state,
                    gig_id)
                VALUES (
                    "${escape(gig.state)}",
                    "${i}");`) : Promise.resolve()

        ).then(save)
        .catch(err => {

            console.error(err);

            console.log(JSON.stringify(gig));

        });

    }

    backup();

    console.log(`Saved ${gigs.length} gigs.`);

}

module.exports = _gigs => {

    gigs = _gigs;

    db.open('../pilothound-db/pilothound.db')
        .then(() => db.exec(`
            DELETE FROM gig;    
            DELETE FROM sqlite_sequence WHERE name = 'gig';
            DELETE FROM state_gig;    
            DELETE FROM sqlite_sequence WHERE name = 'state_gig';`)
        .then(save));

};
