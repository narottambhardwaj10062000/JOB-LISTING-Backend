//IMPORTS
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

//CREATING AN EXPRESS SERVER
const app = express();

app.use(express.json());

//Connecting To The Database
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {console.log("database Connected")})
    .catch((error) => {console.log(error)})

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

//MiddleWares
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);


//Making My server listen to the PORT
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} `);
})