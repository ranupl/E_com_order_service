const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5004;
const db = require("./src/db/connection");
const orderRoutes = require("./src/routes/order.route");
const orderitemRoutes = require("./src/routes/orderitem.route");

db.query((err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Query results:', results);
});
app.use(express.json());
app.use(cors());
app.use("/api/order", orderRoutes);
app.use("/api/orderitem", orderitemRoutes);


app.get("/", (req, res) => {
    console.log("order service is running");
    return res.json({message : "order service is running"});
})

app.listen(PORT, () => {
    console.log(`Order service is running at http://localhost:${PORT}/`)
})