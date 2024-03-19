const express = require("express");
const router = express.Router();
const db = require("../config/mysql");
const conn = db.init();

router.get("/", async (req, res) => {
  const sql = "select * from enrollment";

  conn.query(sql, (err, res) => {
    if (err) console.log("에러에러", err);
    else res.send(res);
  });
});

router.post("/", async (req, res) => {
  const sql = `insert into student (student_id, course_id) values (${req.body.student_id}, '${req.body.course_id}')`;

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
