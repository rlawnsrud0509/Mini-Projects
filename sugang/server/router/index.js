const express = require("express");
const student = require("./student");
const course = require("./course");
const enrollment = require("./enrollment");

const router = express.Router();

router.use("/student", student);
router.use("/course", course);
router.use("/enrollment", enrollment);

module.exports = router;
