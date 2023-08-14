const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000;

var corsOptions = {
    origin: "http://localhost:3001"
}

// require routes
const routes = require("./api/routes/routes");

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

// use routes
app.use("/", routes);

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});