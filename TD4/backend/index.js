const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const port = process.env.port || 5000;
connectDB();

const app = express();
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "frontend", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});