//IMPORTS
const express = require("express");
const router = express.Router();
const Job = require("../models/job.js");
const verifyjwt = require("../middlewares/authMiddleware.js");

//Create API
router.post("/create", verifyjwt, async (req, res) => {
  try {
    //getting data from request body
    const { companyName, title, description, logoUrl } = req.body;

    //validation
    if (!companyName || !title || !description || !logoUrl) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    //Adding The Data To The Database
    const jobData = await Job.create({
      companyName,
      title,
      description,
      logoUrl,
      refUserId: req.body.userId,
    });

    //sending json response
    res.json({
      message: "New Job Added SuccessFully",
    });
  } catch (error) {
    console.log("Error Found", error);
  }
});

//Edit API
router.put("/edit/:jobId", verifyjwt, async (req, res) => {
  try {
    //getting data from request body
    const { companyName, title, logoUrl, description } = req.body;
    const jobId = req.params.jobId;

    // validation
    if (!companyName || !title || !logoUrl || !description || !jobId) {
      res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    //updating the entry in database
    const jobDetails = await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          title,
          logoUrl,
          description,
        },
      }
    );

    //sending JSON response
    res.json({
      message: "Job Details Updated Successfully",
    });
  } catch (error) {
    console.log("Error Found", error);
  }
});

//get Details API
router.get("/description/:jobId", async (req, res) => {
  try {
    //getting data from request body
    const jobId = req.params.jobId;

    //validation
    if (!jobId) {
      res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    //finding job details from the database
    const jobDetails = await Job.findById(jobId);

    //sending data in JSON format
    res.json({
        data: jobDetails
    })

  } catch (error) {
    console.log(error);
  }
});

//get all jobs with filter API 
router.get("/all", async ( req, res ) => {
    try {
        //getting query parameters
        const title = req.query.title || "";
        const skills = req.query.skills;

        //converting skills into array as it was a string originally
        const skillsArray = skills?.split(",");

        //creating filter object
        let filter = {};

        //assigning to filter when skills are passed in query
        if( skillsArray ) {
            filter = { skills: { $in: [...skillsArray] } }
        }

        //fetching all the data from the database
        const jobList = await Job.find(
            {
                title: { $regex: title, $options: "i" },    // my url will be like this => /api/v1/jobs/all?title="analyst"&skills=data,engineering,sql
                ...filter
            }
        )

        //sending JSON response
        res.json({
            data: jobList
        });

    } catch ( error ) {
        console.log(error);
    }
});


//exports
module.exports = router;
