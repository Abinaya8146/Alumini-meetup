import React, { useEffect, useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AlumniDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get('http://localhost:5000/api/users', config);
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.company && u.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
          <p className="text-gray-600 mt-1">Connect with graduates and students</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm shadow-sm"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((person, index) => (
            <div 
              key={person._id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-32 bg-gradient-to-br from-primary-400 via-primary-500 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="px-6 pb-6 relative">
                <div className="h-20 w-20 bg-white rounded-full p-1.5 absolute -top-10 ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="h-full w-full bg-gradient-to-tr from-gray-100 to-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
                    {person.name.charAt(0)}
                  </div>
                </div>
                <div className="pt-12">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                    {person.role}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  {person.company && (
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {person.company}
                    </div>
                  )}
                  {person.batch && (
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      Batch of {person.batch}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.target.innerText = 'Request Sent!';
                      e.target.className = 'mt-4 w-full bg-green-50 text-green-700 font-bold py-2 px-4 rounded-xl transition-all border border-green-200 scale-105';
                      setTimeout(() => {
                        e.target.innerText = 'Connected ✅';
                        e.target.className = 'mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-all border border-green-600';
                      }, 1000);
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 text-primary-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 active:scale-95"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlumniDirectory;
