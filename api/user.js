//localhost:3000/api/user

const express = require('express');
const router = new express.Router();
const User = require('../db');

//localhost:3000/api/user
router.get('/', async (req, res, next) => {
    const users = await User.findAll({
        include: [Group]
    });

    res.send(users);
})

//localhost:3000/api/user/:id
router.get('/:id', async (req, res, next) => {
    const users = await User.findByPk(+req.params.id, {
        include: [Group]
    });

    res.send(users);
})

//localhost:3000/api/user/:id/groups
router.get('/:id/groups', async (req, res, next) => {
    /*const groups = await Group.findAll({
        where: {
            id: +req.params.id
        }
    });*/
    const user = await User.findByPk(+req.params.id);
    const groups = await user.getGroups()
    
    res.send(groups)
})

module.exports = router;