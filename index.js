//localhost:3000
const express = require('express');
const app = express();

const {
    Post,
    User,
    Group,
    Comment
} = require('./db');

app.use(express.urlencoded({ extended: false }));//allow us to use req.body 

const apiRouter = require('./api');
app.use('/api', apiRouter);



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






const PORT = 3000;
app.listen(PORT, (test) => {
    console.log('connected to: ', PORT)
})