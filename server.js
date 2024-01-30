//IMPORTS
const express = require("express");
require("dotenv").config();

//CREATING AN EXPRESS SERVER
const app = express();

//INITIALIZING PORT
const PORT = process.env.PORT || 5000; 

//Health API to know whether server is running well or not
app.get("/health", (req, res) => {
    res.json({
        service: "Job Listing Server",
        status: "Active",
        time: new Date(),
    });
})

//Making My server listen to the PORT
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} `);
})