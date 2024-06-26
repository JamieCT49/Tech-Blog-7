const router = require('express').Router();
const { Blog, user, comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await blog.findAll({
            include: [
                {
                    model: user,
                    attributes: ['username']
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: user,
                    attributes: ['username']
                },
                {
                    model: comment,
                    include: [
                        user
                    ]
                }
            ],
        });

        const blog = blogData.get({ plain: true });
        console.log(blog);
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await user.findByPk(req.session.user_id, {
            attributes: { excluded: ['password']},
            include: [{ model: Blog}]
        });

        const user = userData.get({plain: true});
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('signup');
});

module.exports = router;