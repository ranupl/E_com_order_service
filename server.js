const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5004;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log("order service is running");
    return res.json({message : "order service is running"});
})

app.listen(PORT, () => {
    console.log(`Order service is running at http://localhost:${PORT}/`)
})