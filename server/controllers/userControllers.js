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
        const userId = req.user._id;
        const allowedFields = [
          'email',
          'firstName',
          'lastName',
          'phoneNumber',
          'countryName',
          'currency',
          'currencySymbol',
          'city',
          'state',
          'addressLine1',
          'addressLine2',
          'addressCode'
        ];
      
        const userData = req.body;
      
        // Only allow allowed fields to be updated
        const updateData = {};
        allowedFields.forEach(field => {
          if (userData[field]) {
            updateData[field] = userData[field];
          }
        });

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, {
            new: true,
            runValidators: true
        });
          


        res.status(201).json({
            status: 'success',
            user: updatedUser
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

  exports.updateUserImage = async (req, res) => {
    try {
      const userId  = req.user._id;
  
      if (!req.file) {
        return res.status(400).json({ error: 'Please provide a valid image file' });
      }
  
      const updateFields = {
        image: req.file.path,
        imageUrl: `${process.env.BASEURL}/images/${req.file.filename}`
      };
  
      const user = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        status: 'successfully uploaded image',
        userData: user
      });
  
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  };
  