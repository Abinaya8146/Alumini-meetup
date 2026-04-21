import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobRole: { type: String, required: true },
    duration: { type: Number, default: 0 },
    questionsAndAnswers: [
      {
        question: { type: String, required: true },
        answer: { type: String, default: '' },
        feedback: { type: String, default: '' },
        score: { type: Number, default: 0 } // 0-10 or 0-100
      }
    ],
    overallFeedback: { type: String, default: '' },
    overallScore: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
