const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./mysql.js");
const conn = db.init();
const { v4 } = require("uuid");

app.use(cors());
app.use(bodyParser.json());

app.get("/restaurant", (req, res) => {
  const sql = "select * from restaurant";
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.get("/reservation", (req, res) => {
  const sql = "select * from reservation";
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.post("/reservation", (req, res) => {
  const sql = `insert into reservation values ('${v4()}', '${
    req.body.rname
  }', '${req.body.rnumber}', '${req.body.id}', '${req.body.name}', '${
    req.body.address
  }')`;
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.put("/starpoint", (req, res) => {
  const sql = `update restaurant set starpoint=${req.body.starpoint} where id='${req.body.id}'`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send(result);
  });
});

app.delete("/reservation/:id", (req, res) => {
  const sql = `delete from reservation where rid='${req.params.id}'`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send(result);
  });
});

app.listen(8080);
