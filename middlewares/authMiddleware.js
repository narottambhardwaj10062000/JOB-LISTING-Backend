//IMPORTS
const jwt = require("jsonwebtoken");

//middleware function to verify the jwt token
const verifyjwt = (req, res, next) => {
  try {
    //looking for the authorization token in header
    const token = req.header("Authorization");

    //CASE: token not found
    if (!token) {
      return res.status(401).json({
        errorMessage: "Unauthorized User",
      });
    }

    //decoding jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //CASE: token couldn't be decoded successfully
    if (!decoded) {
      return res.status(401).json({
        errorMessage: "Invalid token",
      });
    }
    // console.log(decoded);

    //storing userId in request body
    req.body.userId = decoded.userId;


    //calling next function after the token had been verified successfully
    next();

  } catch (error) {
    res.status(401).json({
      errorMessage: "Invalid token",
    });
  }
};

module.exports = verifyjwt;
