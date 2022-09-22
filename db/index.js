const Sequelize = require("sequelize");
//const db = new Sequelize("postgres://localhost:5432/seq_intro");//our connection with database//databse name will be seq_intro

const DB_URL = process.env.DB_URL || "postgres://localhost:5432/seq_intro";
const db = new Sequelize(DB_URL);

const User = db.define('user', {
    name:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

const Post = db.define('post',{
    title: {
        //small text
        type: Sequelize.STRING,
        allowNull:false
    },
    content: {
        type:Sequelize.TEXT
    }
    
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
    db,
    User,
    Post
}