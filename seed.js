const {
    db, User, Post
} = require('./db');

const seedDb = async () => {
    //Connects your database
    ///and clears everything out -clear all data
    //db is client
    await db.sync({ force: true, logging: false });

    //create user
    const Louis = await User.create({
        name: "Louis"
    });

    const Ben = await User.create({
        name: "Ben"
    });

    //create post for user
    await Post.create({
        title: "Louis' Post",
        content: "I am awesome",
        userId: Louis.id
    });

    await Post.create({
        title: "Ben's post",
        content: "Louis is awesome",
        userId: Ben.id
    });

    //find all users
    console.log(
        (await User.findAll()).map(user => user.name)
    );

    console.log(
        (await Post.findAll()).map(post => post.title)
    );

    
};

seedDb();
