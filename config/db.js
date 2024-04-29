const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
     {
          dialect: "mysql",
          host: "localhost",
          logging: false,
          define: {
               timestamps: true,
               charset: "utf8",
               collate: "utf8_general_ci"
          }
     });

module.exports = db;