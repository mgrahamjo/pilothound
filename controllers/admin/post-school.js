const db = require('../../util/db');

module.exports = (req, res) => {

    const data = req.body;

    data.states = Array.isArray(data.states) ? data.states : [data.states];

    data.online = data.online ? '1' : '';

    db.saveSchool(data).then(() => res.redirect('admin/schools'));

};
