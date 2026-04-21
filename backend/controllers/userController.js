import User from '../models/User.js';

// @desc    Get all users for directory (Alumni & Students) with filters
// @route   GET /api/users
// @access  Private
export const getUsers = async (req, res) => {
  try {
    const { role, company, batch, search } = req.query;
    
    // Build query object
    let query = {};
    
    if (role) query.role = role;
    if (company) query.company = { $regex: company, $options: 'i' };
    if (batch) query.batch = batch;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
