require("./db");
const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();
var port = process.env.PORT || 5000;
// app.options('*', cors())
app.options('*', (req, res) => {
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    // Respond with a 200 OK status
    res.status(200).send();
  });

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// const corsOptions = {
//     origin: true, //included origin as true
//     credentials: true, //included credentials as true
// };

app.use(express.json());
// Available Routes
app.use("/", require("./router/auth"));

app.get("/", (req, res) => {
    res.send("All set");
});
app.listen(port, () => {
    console.log(`Backend is listening at http://localhost:${port}`);
});
