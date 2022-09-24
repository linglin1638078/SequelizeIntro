const { user } = require('pg/lib/defaults');
const {
    db, User, Post
} = require('./db');

const seedDb = async () => {
    //Connects your database
    ///and clears everything out -clear all data
    //db is client
    await db.sync({ force: true, logging: false });

    //will run way faster than write inidivual async await for each user
    /*const users = [
        {
            firstName: 'Louis',
            lastName: 'RaBeno',

            role: 'mod'
        },
        {
            firstName: "Ben",
            lastName: "Odisho",
            role: 'user'
    
        }
    ];
    //all promises will be saved in an array before returning back
    const Promises = users.map((user) => User.create(user));
    //async action that wait for each single element in the array to be finished
    const[louis, ben] = await Promise.all(Promises);*/

    const start = new Date()


    //create user
    const Louis = await User.create({
        firstName: "Louis",
        lastName: "Rabeno",
        role:'admin'
    });

    const Ben = await User.create({
        firstName: "Ben",
        lastName: "Odisho",
        role:'user'

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

    const end = new Date();
    console.log(end - start);
    
    //find all users
    console.log(
        (await User.findAll()).map(user => user.role)
    );

    console.log(
        (await Post.findAll()).map(post => post.title)
    );

    
};

seedDb();
