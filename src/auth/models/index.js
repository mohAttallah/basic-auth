'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
console.log("DATABASE_URL:", DATABASE_URL );


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} :{}





const sequelize = new Sequelize(DATABASE_URL , sequelizeOptions);



const user = require("./users-model");

module.exports = {
  db: sequelize,
  User:user(sequelize, DataTypes)
};