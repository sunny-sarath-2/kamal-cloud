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

const connection = new Connection(config);

connection.on("connect", (err) => {
  console.log("coonected");
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
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

  request.on("row", (columns) => {
    columns.forEach((column) => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}
