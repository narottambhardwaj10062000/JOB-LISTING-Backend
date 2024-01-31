//IMPORTS
const express = require("express");
const router = express.Router();
const Job = require("../models/job.js");

//Create API
router.post("/create", async (req, res) => {
  try {
    //getting data from request body
    const { companyName, title, description, logoUrl } = req.body;

    //validation
    if (!companyName || !title || !description || !logoUrl) {
        return res.status(400).json({
            errorMessage: "Bad Request"
        })
    }

    //Adding The Data To The Database
    const jobData = await Job.create({
        companyName,
        title,
        description,
        logoUrl,
    });

    //sending json response
    res.json({
        message: "New Job Added SuccessFully",
    });

  } catch (error) {
    console.log("Error Found", error);
  }
});

//exports
module.exports = router;
