const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const conn = db.init();

router.get("/", async (req, res) => {
  const sql = "select * from student";

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

router.post("/", async (req, res) => {
  const sql = `insert into student (grade, name, gender) values (${req.body.grade}, '${req.body.name}', '${req.body.gender}')`;

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

router.delete("/:id", async (req, res) => {
  const sql = `delete from student where id=${req.body.id}`;

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

module.exports = router;
