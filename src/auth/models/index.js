const { Sequelize,  DataTypes } = require('sequelize');
const POSTGRES_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(POSTGRES_URL, {});
const user = require("./users-model");

module.exports = {
  db: sequelize,
  User:user(sequelize, DataTypes)
};