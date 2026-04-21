import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Activity, Bell, Briefcase, MessagesSquare } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [stats, setStats] = useState({
    views: 0,
    messages: 0,
    matches: 0,
    notifications: 0,
  });
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Connect to Socket.IO for real-time updates
      const socket = io('http://localhost:5000');
      
      // Join a private room for this user to receive personal notifications
      socket.emit('join', user._id);
      
      socket.on('new_message', () => {
        setStats(prev => ({ ...prev, messages: prev.messages + 1, notifications: prev.notifications + 1 }));
      });
      
      socket.on('profile_view', () => {
        setStats(prev => ({ ...prev, views: prev.views + 1, notifications: prev.notifications + 1 }));
      });
      
      socket.on('job_match', () => {
        setStats(prev => ({ ...prev, matches: prev.matches + 1, notifications: prev.notifications + 1 }));
      });

      // Fetch Upcoming Events
      const fetchEvents = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const res = await axios.get('http://localhost:5000/api/events', config);
          // Only show top 2 upcoming events
          setEvents(res.data.slice(0, 2));
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      
      fetchEvents();

      return () => {
        socket.disconnect();
      };
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600 mt-2">Here's what's happening in your network today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-xl"><Activity className="text-blue-600 h-6 w-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Profile Views</p>
            <p className="text-2xl font-bold text-gray-900">{stats.views}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-xl"><MessagesSquare className="text-purple-600 h-6 w-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">New Messages</p>
            <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-emerald-100 p-3 rounded-xl"><Briefcase className="text-emerald-600 h-6 w-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Job Matches</p>
            <p className="text-2xl font-bold text-gray-900">{stats.matches}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-xl"><Bell className="text-orange-600 h-6 w-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Notifications</p>
            <p className="text-2xl font-bold text-gray-900">{stats.notifications}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity Feed</h2>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div>
                <p className="text-gray-800"><span className="font-semibold">Sarah Jenkins</span> posted a new job opportunity at Google.</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div>
                <p className="text-gray-800"><span className="font-semibold">Michael Chen</span> updated his profile.</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          {events.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming events right now.</p>
          ) : (
            events.map(event => (
              <div key={event._id} className="border border-gray-100 rounded-xl p-4 bg-gray-50 mb-4 cursor-pointer hover:bg-gray-100 transition">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
