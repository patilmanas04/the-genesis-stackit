require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();
app.use(express.json());

// Connect MongoDB
connectDB();

// Public Routes
app.use("/api/public", require("./routes/public/auth"));

// Private Routes
app.use("/api/user", require("./routes/private/user"));
app.use("/api/admin", require("./routes/private/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
