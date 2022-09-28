const Sequelize = require("sequelize");
const db = require('./db');

const User = require('./user');
const Group = require('./group');
const Post = require('./post');
const Comment = require('./comment');
const UserGroup = require('./userGroup');





User.hasMany(Post);//UserId and PostId filed is automatically created when the relationship is created
Post.belongsTo(User);

//many-to-many-invisible table 'userGroup'
//userId | groupId
// 2     |    1
// 1     |    1

//[user1, user 2] -- group 1
User.belongsToMany(Group, {through: 'userGroup'});
Group.belongsToMany(User, { through: 'userGroup' });

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

//still keep this, so seed only needs to required from index.js in db folder
module.exports = {
    db,
    User,
    Post,
    Comment,
    Group,
    UserGroup
}