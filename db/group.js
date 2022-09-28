const Sequelize = require("sequelize");
const db = require('./db');

const Group = db.define('Group', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    //override id
    /*customId: {
        type: Sequelize.UUIDV4,
        primaryKey:true
    }*/
})

module.exports = Group;