const db = require('../../util/db'),
    swap = require('../../util/swap'),
    states = require('../../util/states');

const field = (key, value = '') => swap(key, {

    id: () => `<input type="hidden" name="id" value="${value}"/>`,

    description: () => `<div>
        <label for="description">description</label>
        <textarea name="description" id="description">${value || ''}</textarea>
    </div>`,

    online: () => `<div>
        <label for="online">online</label>
        <input type="checkbox" name="online" id="online" ${value ? 'checked' : ''}/>
    </div>`,

    states: () => `<div>
        <label for="states">states</label>
        <select multiple name="states" id="states">
            ${states.map(state => `
                <option value="${state}" ${value.includes(state) ? 'selected' : ''}>${state}</option>
            `)}
        </select>
    </div>`,

    default: () => `<div>
        <label for="${key}">${key}</label>
        <input type="text" name="${key}" id="${key}" value="${value || ''}"/>
    </div>`

});

module.exports = (req, res) => {

    if (req.params.id === 'new') {

        res.render('admin/edit', {
            h1: 'New School',
            path: '/admin/schools',
            fields: [
                field('id', 'new'),
                field('name'),
                field('url'),
                field('email'),
                field('phone'),
                field('online'),
                field('address'),
                field('logo'),
                field('color'),
                field('description'),
                field('states', [])
            ]
        });

    } else {
        
        db.school(req.params.id).then(data => 

            res.render('admin/edit', {
                h1: 'Edit School',
                path: '/admin/schools',
                fields: Object.keys(data).map(key => field(key, data[key]))
            })

        );

    }

};
