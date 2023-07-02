require("./db");
const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();
var port = process.env.PORT || 5000;
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

// const corsOptions = {
// 	origin: true, //included origin as true
// 	credentials: true, //included credentials as true
// };

app.use(express.json());
// Available Routes
app.use("/api/auth", require("./router/auth"));

app.get("/", (req, res) => {
    res.send("All set")
});
app.listen(port, () => {
    console.log(`Backend is listening at http://localhost:${port}`);
});
