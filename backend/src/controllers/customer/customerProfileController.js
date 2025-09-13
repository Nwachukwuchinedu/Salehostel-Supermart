const User = require('../../models/User');

// @desc    Get customer profile
// @route   GET /api/customer/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id).select('-password');
    res.json({ customer });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update customer profile
// @route   PUT /api/customer/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.address = req.body.address || customer.address;

      const updatedCustomer = await customer.save();

      res.json({
        success: true,
        customer: {
          _id: updatedCustomer._id,
          name: updatedCustomer.name,
          email: updatedCustomer.email,
          phone: updatedCustomer.phone,
          address: updatedCustomer.address,
        }
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get customer addresses
// @route   GET /api/customer/profile/addresses
// @access  Private
const getAddresses = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id).select('address');
    
    if (customer) {
      res.json({
        success: true,
        addresses: customer.address ? [customer.address] : []
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add customer address
// @route   POST /api/customer/profile/addresses
// @access  Private
const addAddress = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id);
    
    if (customer) {
      customer.address = req.body.address;
      await customer.save();
      
      res.json({
        success: true,
        address: customer.address
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update customer address
// @route   PUT /api/customer/profile/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id);
    
    if (customer) {
      customer.address = req.body.address;
      await customer.save();
      
      res.json({
        success: true,
        address: customer.address
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete customer address
// @route   DELETE /api/customer/profile/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id);
    
    if (customer) {
      customer.address = undefined;
      await customer.save();
      
      res.json({
        success: true,
        message: 'Address deleted successfully'
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
};