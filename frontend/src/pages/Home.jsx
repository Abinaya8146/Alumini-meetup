import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Briefcase, Calendar, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleInteraction = (e) => {
    // Prevent redirecting multiple times if a Link is clicked
    if (e.target.closest('a')) return;
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen cursor-pointer" onClick={handleInteraction}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-8 border border-primary-100">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700">Connecting Generations of Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            The Ultimate Network for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              Students & Alumni
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl text-xl text-slate-600 mx-auto mb-10">
            Unlock career opportunities, find mentorship, and stay connected with your alma mater. Join a thriving community of peers and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/login" 
              className="inline-flex justify-center items-center px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join the Network
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/login" 
              className="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm"
            >
              Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to grow</h2>
            <p className="mt-4 text-lg text-slate-600">A comprehensive platform designed to foster meaningful connections.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary-600" />,
                title: "Networking & Mentorship",
                description: "Connect with industry leaders, request mentorship, and build relationships that last a lifetime."
              },
              {
                icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
                title: "Job & Internship Portal",
                description: "Access exclusive opportunities posted by alumni. Apply directly and get referrals to top companies."
              },
              {
                icon: <Calendar className="h-8 w-8 text-emerald-600" />,
                title: "Events & Webinars",
                description: "Stay updated on alumni meets, skill-building webinars, and virtual networking sessions."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 group">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
