const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Owner = require("../models/Owner");

const router = express.Router();

/* STUDENT SIGNUP */
router.post("/student/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const student = await Student.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed
  });
  res.json(student);
});

/* STUDENT LOGIN */
router.post("/student/login", async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) return res.status(400).json({ error: "Invalid login" });

  const ok = await bcrypt.compare(req.body.password, student.password);
  if (!ok) return res.status(400).json({ error: "Invalid login" });

  res.json(student);
});

/* OWNER LOGIN (simple) */
router.post("/owner/login", async (req, res) => {
  const owner = await Owner.findOne({ email: req.body.email });
  res.json(owner);
});

module.exports = router;
