import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Calendar, MapPin, Users } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get('http://localhost:5000/api/events', config);
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchEvents();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-600 mt-1">Webinars, meetups, and workshops</p>
        </div>
        {user?.role === 'Alumni' && (
          <button className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700 transition shadow-sm">
            Create Event
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-500 col-span-3">No events scheduled.</p>
          ) : (
             events.map((event) => (
              <div key={event._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-32 bg-primary-100 flex items-center justify-center p-6 text-center">
                   <h3 className="text-xl font-bold text-primary-900 line-clamp-2">{event.title}</h3>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-primary-600"/> {new Date(event.date).toLocaleDateString()}</div>
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary-600"/> {event.location || 'TBA'}</div>
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{event.description}</p>
                  </div>
                  <button className="w-full bg-gray-50 text-gray-900 py-2 border border-gray-200 rounded-xl font-medium hover:bg-white hover:border-primary-300 hover:text-primary-600 transition-colors">
                    RSVP Now
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

export default Events;
