const express = require("express");
const app = express();
require('dotenv').config({ path: './config/.env' });
const cors = require("cors");
const PORT = process.env.PORT || 5004;
const session = require('express-session');
const orderRoutes = require("./routes/order.routes");

app.use(express.json());
app.use(cors());
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
    console.log("order service is running");
    return res.json({message : "order service is running"});
})

app.listen(PORT, () => {
    console.log(`Order service is running at http://localhost:${PORT}/`)
})