const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./mysql.js");
const conn = db.init();
const { v4 } = require("uuid");

app.use(cors());
app.use(bodyParser.json());

app.get("/post", (req, res) => {
  const sql = "select * from blog";
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.post("/post", (req, res) => {
  const sql = `insert into blog values('${v4()}', '${req.body.title}', '${
    req.body.date
  }', '${req.body.content}', '${req.body.author}')`;
  conn.query(sql, (err, result) => {
    if (err) console.log("에러에러삐익삐익", err);
    else res.send(result);
  });
});

app.put("/post", (req, res) => {
  const sql = `update blog set content='${req.body.content}', title='${req.body.title}', author='${req.body.author}', craete_at='${req.body.date}' where id='${req.body.id}'`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send(result);
  });
});

app.delete("/post/:id", (req, res) => {
  const sql = `delete from blog where id='${req.params.id}'`;
  conn.query(sql, (err, result) => {
    if (err) console.log("삐익삐익에러발생", err);
    else res.send(result);
  });
});

app.listen(8080);
