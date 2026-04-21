import Job from '../models/Job.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('postedBy', 'name email company profileImage');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  const { title, company, location, description, type, requirements } = req.body;
  try {
    const job = new Job({
      title,
      company,
      location,
      description,
      type,
      requirements,
      postedBy: req.user._id,
    });
    
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
