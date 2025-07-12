const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/auth");
const authorize = require("../../middleware/role");

router.get("/profile", authenticate, authorize("user", "admin"), (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
