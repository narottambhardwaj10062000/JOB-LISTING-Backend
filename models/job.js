//IMPORTS
const mongoose = require("mongoose");

//creating job schema
const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    }
})

//Exports
module.exports = mongoose.model("Job", jobSchema);