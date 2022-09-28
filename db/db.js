const Sequelize = require("sequelize");
//const db = new Sequelize("postgres://localhost:5432/seq_intro");//our connection with database//databse name will be seq_intro

const DB_URL = process.env.DB_URL || "postgres://localhost:5432/seq_intro";
const db = new Sequelize(DB_URL);

module.exports = db;