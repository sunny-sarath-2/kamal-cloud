// const Sequelize = require("sequelize");
// const dotenv = require("dotenv");

// dotenv.config();

// module.exports = new Sequelize("cloud-a3-db", "kamal", "password@123", {
//   host: "cloud-a3-db-server.database.windows.net:1433",
//   port: 1433,
//   dialect: "mssql",
//   operatorsAliases: false,
//   logging: function (...msg) {
//     console.log("err", msg);
//   },

//   // logging: (...msg) => console.log(msg),
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   dialectOptions: {
//     encrypt: true,
//   },
// });

const { Connection, Request } = require("tedious");

const config = {
  authentication: {
    options: {
      userName: "kamal", // update me
      password: "password@123", // update me
    },
    type: "default",
  },
  server: "cloud-a3-db-server.database.windows.net", // update me
  // port: 1433,
  options: {
    database: "cloud-a3-db", //update me

    encrypt: true,
  },
};

module.exports = new Connection(config);
