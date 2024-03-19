const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const conn = db.init();

router.get("/", async (req, res) => {
  const sql = "select * from course";

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

router.post("/", async (req, res) => {
  const sql = `insert into course (name, professor, credit) values (${req.body.name}, '${req.body.professor}', '${req.body.credit}')`;

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

router.delete("/:id", async (req, res) => {
  const sql = `delete from course where id=${req.body.id}`;

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

module.exports = router;
