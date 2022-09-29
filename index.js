//localhost:3000
const express = require('express');
const app = express();

const {
    Post,
    User,
    Group,
    Comment
} = require('./db');

app.use(express.urlencoded({ extended: false }));

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.get('/', async(req, res, next) => {
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

app.get('/group', async (req, res, next) => {
    const group = await Group.findAll();
    res.send(group);
});

app.put('/group/:id', async (req, res, next) => {
    const group = await Group.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    })
});





app.put('/posts/:id', async(req, res, next) => {
    const foundPost = await Post.findByPk(+req.params.id);
    const newPost = await foundPost.update({
        title: 'new name'
    });
    res.send(newPost);
})

app.put('/posts/:id', async (res, req, next) => {
    console.log(req.body);
    const newValue = {};
    if (req.body.title) newValue.title = req.body.title;
    if (req.body.content) newValue.content = req.body.content;

    const foundPost = await Post.findByPk(+req.params.id);
    const newPost = await foundPost.update(newValue);

    res.send(newPost);
})
app.get('/posts/:id/user', async (req, res, next) => {
    const foundPost = await Post.findByPk(+req.params.id,{
        include:[User]
    });
    const user = foundPost.getUser();
    res.send(user);
})
const PORT = 3000;
app.listen(PORT, (test) => {
    console.log('connected to: ', PORT)
})