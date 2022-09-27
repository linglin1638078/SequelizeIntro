const { user } = require('pg/lib/defaults');
const {
    db, User, Post, Group, UserGroup
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
    //const users = await Promise.all(Promises);
    //const louis = user[0];
    //const ben = user[1];

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

    const group1 = await Group.create({
        name: 'Group1'
    });

    const group2 = await Group.create({
        name:'Group2'
    })

    await Louis.setGroups([group1, group2]);

    await UserGroup.create({
        userId: Louis.id,
        GroupId: group1.id
    })

    await UserGroup.create({
        userId: Louis.id,
        GroupId:group2.id
    })

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
