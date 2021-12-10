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

// db = new Connection(config);

const db = require("../config/database");

// const { Request } = require("tedious");
exports.create_table = () =>
  new Promise((resolve, reject) => {
    db.connect();
    db.on("connect", (err) => {
      console.log("coonected");
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(
          `CREATE TABLE gigs (
  title varchar(45),
  technologies varchar(255),
  description varchar(255),
  budget varchar(45),
  contact_email varchar(45)
);`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`${rowCount} row(s) returned`);
            }
          }
        );
        console.log("called");
        request.on("row", (gigs) => {
          resolve(gigs);
        });
        db.execSql(request);
      }
    });
  });

exports.get_gigs = () =>
  new Promise((resolve, reject) => {
    db.connect();
    db.on("connect", (err) => {
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(`SELECT * from gigs;`, (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`${rowCount} row(s) returned`);
          }
        });
        request.on("row", (gigs) => {
          resolve(gigs);
        });
        db.execSql(request);
      }
    });
  });

exports.insert_gigs = (data) =>
  new Promise((resolve, reject) => {
    let { title, technologies, description, budget, contact_email } = data;
    db.connect();
    db.on("connect", (err) => {
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(
          `INSERT INTO [dbo].[gigs] ("title", "technologies", "description", "budget", "contact_email") 
          VALUES ('${title}', '${technologies}', '${description}', '${budget}', '${contact_email}');`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              resolve(rowCount);
              console.log(`${rowCount} row(s) returned`);
            }
          }
        );
        request.on("row", (gigs) => {});
        db.execSql(request);
      }
    });
  });

exports.search_gig = (term) =>
  new Promise((resolve, reject) => {
    db.connect();
    db.on("connect", (err) => {
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(
          `SELECT * FROM gigs
        WHERE technologies LIKE '%${term}%'`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`${rowCount} row(s) returned`);
            }
          }
        );
        request.on("row", (gigs) => {
          resolve(gigs);
        });
        db.execSql(request);
      }
    });
  });
