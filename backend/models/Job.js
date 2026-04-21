import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], required: true },
    requirements: { type: String },
    applications: [
      {
        applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        resumeUrl: { type: String },
        status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'], default: 'Pending' },
        appliedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
