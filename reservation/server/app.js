const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./mysql.js");
const conn = db.init();
const { v4 } = require("uuid");

app.use(cors());
app.use(express.json());

app.get("/restaurant", (req, res) => {
  const sql = "select * from restaurant";
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.get("/starpoint", (req, res) => {
  const sql =
    "select v.id, round(avg(v.starpoint), 1) as starpoint from restaurant as r, review as v group by v.id";
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
  const sql = `insert into review values ('${v4()}', '${req.body.id}', ${
    req.body.starpoint
  })`;
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
