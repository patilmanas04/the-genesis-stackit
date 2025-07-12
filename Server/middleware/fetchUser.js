require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

const fetchUserDetails = (req, res, next) => {
  const token = req.header('Auth-Token')
  if (!token) {
    return res.status(401).json({ success: false, error: "Please Authenticate using a valid token" })
  }

  try {
    const tokenData = jwt.verify(token, JWT_PRIVATE_KEY)
    req.user = tokenData.user
    next()
  }
  catch (error) {
    return res.status(401).json({ success: false, error: "Please Authenticate using a valid token" })
  }
}

module.exports = fetchUserDetails;