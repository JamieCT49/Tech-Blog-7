const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
    comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', async (req, res) => {
    try {
        const newComment = await comment.create({
            ...req.body,
            userId: req.session.userId
        });
        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'Comment not found.'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;