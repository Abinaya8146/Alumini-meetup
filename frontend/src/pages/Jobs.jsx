import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get('http://localhost:5000/api/jobs', config);
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchJobs();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
          <p className="text-gray-600 mt-1">Opportunities from your alumni network</p>
        </div>
        {user?.role === 'Alumni' && (
          <button className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700 transition shadow-sm">
            Post a Job
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col sm:flex-row sm:items-center justify-between group">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-primary-500"/> {job.company}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary-500"/> {job.location}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-primary-500"/> {job.type}</span>
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-2 sm:max-w-2xl">{job.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                  <button 
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      btn.innerHTML = 'Application Sent! 🚀';
                      btn.className = 'flex items-center text-white bg-green-500 px-6 py-2 rounded-xl font-bold shadow-md transform scale-105 transition-all duration-300';
                    }}
                    className="flex items-center text-primary-600 bg-primary-50 px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                  >
                    Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;
