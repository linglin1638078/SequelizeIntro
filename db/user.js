const Sequelize = require("sequelize");

//seperate each module into its own js file
const db = require('./db');


const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        //can set constraint
        /*validate: {
            min: 0,
            max: 20
        },*/
        
        //unique: true - make sure no one enter the same firstName twice

        //return the way the user want to look-not actually changing the field data
        get() {
            const currName = this.getDataValue('firstName');
            const firstLetter = currName[0].toUpperCase();
            const otherLetters = currName.slice(1);
            return firstLetter + otherLetters;
        },
        //seting the data that is going into the database
        set(value) {
            const lowerCaseName = value.toLowerCase();
            this.setDataValue('firstName', lowerCaseName)
        }
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    fullName: {
        //virtual field that exited in databse- not creating new field, but use get() to access info in other field to manipulate
        //will manipulate it before getting back to user
        type: Sequelize.VIRTUAL,
        get() {
            const firstName = this.getDataValue('firstName');
            const lastName = this.getDataValue('lastName');
            return `${firstName} ${lastName}`;
        }
    },

    /*role: {
            type: Sequelize.STRING,
            set(value) {
                if (value !== 'mod' || value !== 'admin' || value !== 'user') {
                    //set it
                }
                else{
                    //don't
                };
            }
        }*/
        //ignore any role other than the below three
    role: {
        type: Sequelize.ENUM([
            'mod',
            'admin',
            'user'
        ]),
    },
    hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
    }
});

module.exports = User;