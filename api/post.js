const Sequelize = require("sequelize");
const express = require('express');
const router = new express.Router();
const { Post, User } = require('../db');

//localhost:3000/api/post
router.get('/', async(req, res, next) => {
    const posts = await Post.findAll({
        include: [
            User
        ]
    });
    
    res.send(`
        <body>
            ${posts
            .map(post => `
                <div>
                    <h2>${post.title}</h2>
                    <h3>${post.user.name}</h3>
                    <p>${post.content}</p>
                </div>
            `).join("")
        }
        </body>
    `)

})

//PUT localhost:3000/api/post/id
router.put('/:id', async (req, res, next) => {
    const foundPost = await Post.findByPk(+req.params.id);
    const newPost = await foundPost.update({
        title: 'new name'
    });
    res.send(newPost);
})

router.put('/:id', async (res, req, next) => {
    console.log(req.body);
    const newValue = {};
    if (req.body.title) newValue.title = req.body.title;
    if (req.body.content) newValue.content = req.body.content;

    const foundPost = await Post.findByPk(+req.params.id);
    const newPost = await foundPost.update(newValue);

    res.send(newPost);
})

//GET localhost:3000/api/post/id
router.get('/:id', async (req, res) => {
    const singlePost = await Post.findByPk(+req.params.id);
    res.send(singlePost);

})

router.post('/', async (req, res) => {
    //the same directly create the post with title and content property with value title and content
    const { title, content, userId } = require(req.body);
    await Post.create({
        title,content,userId
    })
    res.status(201).send('new post created');
})


router.get('/:id/user', async (req, res, next) => {
    const foundPost = await Post.findByPk(+req.params.id,{
        include:[User]
    });
    const user = foundPost.getUser();
    res.send(user);
})

router.delete('/:id', async (req, res) => {
    await Post.destroy({
        where:{
            id: +req.params.id
        }
    })
    res.send('post deleted');
})

module.exports = router;