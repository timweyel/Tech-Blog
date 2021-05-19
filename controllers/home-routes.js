const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/index');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: ['id', 'title', 'body_content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id'],
                include: [
                    {
                    model: User,
                    attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn    
        });
    })
    .catch(err => res.status(500).json(err));
});

// login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.render('single-post', {  
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;