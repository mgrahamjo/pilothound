const content = {
    '/about': require('../content/about'),
    '/privacy': require('../content/privacy'),
    '/terms': require('../content/terms')
};

const slugs = {
    '/about': 'About PilotHound',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms of Service'
};

module.exports = (req, res) => {

    res.render('page', {
        bodyClass: 'article',
        content: content[req.path],
        slug: slugs[req.path]
    });

};
