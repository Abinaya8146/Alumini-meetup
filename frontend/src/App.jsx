import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AlumniDirectory from './pages/AlumniDirectory';
import Jobs from './pages/Jobs';
import Events from './pages/Events';
import InterviewDashboard from './pages/InterviewDashboard';
import ActiveInterview from './pages/ActiveInterview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/directory" element={<AlumniDirectory />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/interview" element={<InterviewDashboard />} />
            <Route path="/interview/:id" element={<ActiveInterview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
