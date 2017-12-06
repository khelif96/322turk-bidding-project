/*jshint esversion: 6 */


exports.getApi = (req, res) => {
  res.json({message: "Welcome to the turkApi"});
  res.status(200);
};

exports.postApi = (req,res) => {
  res.json({error: "Route does not allow POST"});
  res.status(200);
};

// Middle wear to check if path is correct
exports.invalidPath = (req,res,next) => {

    res.status(400).json({"error": "Invalid Path"});

}
