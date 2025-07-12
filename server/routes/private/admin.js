const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/auth");
const authorize = require("../../middleware/role");

router.get("/dashboard", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
