const User = require('../models/userSchema')
const APIFEATURES = require('../utilities/apiFeatures')
exports.getAllUsers = async (req, res) => {
  try{
   const features = new APIFEATURES(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination()
    const allUsers = await features.query
    
    res.status(201).json(
      {
    status: 'success',
    amount: allUsers.length,
    products: allUsers
      }
    )}catch(err){
    res.status(404).json(
      {
        status: 'failed',
        errorMessage: err.message
      }
    )
  }
}
  exports.getCurrentUser = async (req, res) => {
    try{
      //req.params.id
      const user = await User.findById(req.user._id)
      
      res.status(201).json(
        {
      status: 'success',
      user
        }
      )}catch(err){
      res.status(404).json(
        {
          status: 'failed',
          errorMessage: err.message
        }
      )
    }
  }
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };