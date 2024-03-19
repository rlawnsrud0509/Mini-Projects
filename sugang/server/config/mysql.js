const mysql = require("mysql2");

const dbInfo = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "1234",
  database: "sugang",
};

module.exports = {
  init: function () {
    return mysql.createConnection(dbInfo);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error(`디비실패 : ${err}`);
      else console.log("연결성공");
    });
  },
};
