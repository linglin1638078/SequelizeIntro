const Sequelize = require("sequelize");
const db = require('./db');

const Post = db.define('post', {
    title: {
        //small text
        type: Sequelize.STRING,
        allowNull:false
    },
    content: {
        type:Sequelize.TEXT
    }
    
});

module.exports = Post;