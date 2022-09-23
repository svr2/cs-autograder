const express = require("express");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();

// Configure port
const PORT = process.env.BACKEND_PORT || 5000;

const app = express();

// Set middleware
app.use(express.json());
app.use(require("cors")());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
