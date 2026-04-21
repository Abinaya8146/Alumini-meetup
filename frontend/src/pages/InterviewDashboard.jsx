import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Bot, Briefcase, PlayCircle } from 'lucide-react';

const InterviewDashboard = () => {
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const startInterview = async (e) => {
    e.preventDefault();
    if (!jobRole) return;
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post('http://localhost:5000/api/interview/start', { jobRole }, config);
      navigate(`/interview/${res.data._id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to start interview. Check API Key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 sm:p-12 text-center">
        <div className="mx-auto h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <Bot className="h-10 w-10 text-primary-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Virtual AI Interview</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Practice your technical and behavioral skills with our AI interviewer. Select a target job role, and get real-time feedback to help you ace your real placements!
        </p>

        <form onSubmit={startInterview} className="max-w-md mx-auto space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              placeholder="E.g. Frontend Developer, Data Analyst..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-lg shadow-sm transition-all"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !jobRole}
            className="w-full flex items-center justify-center py-4 px-8 border border-transparent text-lg font-bold rounded-2xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Preparing AI...' : <><PlayCircle className="mr-2 h-6 w-6" /> Start Interview</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewDashboard;
