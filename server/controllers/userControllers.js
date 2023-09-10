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
  exports.updateCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        const newShopName = req.body.shop; 

        const { shop, ...otherUpdates } = updateData;
        const updatedUserWithoutShop = await User.findByIdAndUpdate(userId, { $set: otherUpdates }, {
            new: true,
            runValidators: true
        });

        const updatedUserWithShop = await User.findByIdAndUpdate(userId, { $push: { shop: newShopName } }, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            user: updatedUserWithShop
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            errorMessage: err.message
        });
    }
};


  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  exports.updateCurrentUserShop = async (userId, newShopId) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { shops: newShopId } },
        { new: true, runValidators: true }
      );
  
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };