const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");
const conn = db.init();

app.use(cors());
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  const sql = "select * from todolist";
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.post("/todos", (req, res) => {
  const sql = `insert into todolist(content, completed) values('${req.body.title}', false)`;
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send("넣었다.");
  });
});

app.put("/todos/:id", (req, res) => {
  const sql = `update todolist set completed=${!req.body.complete} where id=${
    req.params.id
  }`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send("성공햇다.");
  });
});

app.delete("/todos/:id", (req, res) => {
  const sql = `delete from todolist where id=${req.params.id}`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send("성공햇다.");
  });
});

app.use(cors());

app.listen(8080);
