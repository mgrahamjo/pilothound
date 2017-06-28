const swap = require('../../util/swap');

const field = (key, value = '') => swap(key, {

    body: () => `<div>
        <label for="body">body</label>
        <textarea name="body" id="body">${value || ''}</textarea>
    </div>`,

    default: () => `<div>
        <label for="${key}">${key}</label>
        <input type="text" name="${key}" id="${key}" value="${value || ''}"/>
    </div>`

});

module.exports = (req, res) => {

    if (req.params.file === 'new') {

        res.render('admin/edit', {
            h1: 'New Blog Post',
            path: '/admin/blog',
            fields: [
                field('file', new Date().toDateString().replace(/\s/g, '-').toLowerCase() + '.json'),
                field('title'),
                field('date', new Date().toDateString()),
                field('body')
            ]
        });

    } else {

        const post = require('../../content/blog/' + req.params.file);

        res.render('admin/edit', {
            h1: 'Edit Blog Post',
            path: '/admin/blog',
            fields: [
                field('file', req.params.file),
                field('title', post.title),
                field('date', new Date(post.date).toDateString()),
                field('body', post.body)
            ]
        });

    }

};
