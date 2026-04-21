import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Job from './models/Job.js';
import Event from './models/Event.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1/alumni-db');
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Job.deleteMany();
    await Event.deleteMany();

    // Create Admin and Alumni Users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@college.edu',
        password: 'password123', // In a real app we would hash this, but auth logic uses pre-save hook? Wait, User.js might not have a pre-save hook for password hash if we used it in register.
        // Actually, let's just create raw users. The authController hashes during register.
        // Since we bypass mongoose middleware using insertMany or if there IS a middleware, it might hash. What does User.js look like?
        role: 'Admin',
      },
      {
        name: 'Sarah Jenkins',
        email: 'sarah@google.com',
        password: 'password123',
        role: 'Alumni',
        company: 'Google',
        batch: '2019',
        skills: ['React', 'Node.js', 'System Design']
      },
      {
        name: 'Michael Chen',
        email: 'michael@amazon.com',
        password: 'password123',
        role: 'Alumni',
        company: 'Amazon',
        batch: '2021',
        skills: ['AWS', 'Python', 'Machine Learning']
      },
       {
        name: 'Priya Sharma',
        email: 'priya@microsoft.com',
        password: 'password123',
        role: 'Alumni',
        company: 'Microsoft',
        batch: '2020',
        skills: ['C#', '.NET', 'Azure']
      }
    ]);

    const sarah = users[1]._id;
    const michael = users[2]._id;

    // Create Jobs
    await Job.insertMany([
      {
        title: 'Frontend Engineer',
        company: 'Google',
        location: 'Remote',
        description: 'Exciting opportunity for a fresh graduate to join the Google Maps team. Must know React and Typescript.',
        type: 'Full-time',
        postedBy: sarah
      },
      {
        title: 'Data Science Intern',
        company: 'Amazon',
        location: 'Seattle, WA',
        description: 'Summer internship for juniors or seniors in Computer Science. Focus on predictive modeling.',
        type: 'Internship',
        postedBy: michael
      }
    ]);

    // Create Events
    await Event.insertMany([
      {
        title: 'Tech Alumni Mixer 2026',
        description: 'A grand virtual networking mixer for all alumni and current students to connect and share industry trends.',
        date: new Date('2026-04-24T18:00:00Z'),
        location: 'Virtual Zoom Event',
        organizedBy: sarah
      },
      {
        title: 'Mock Interview Session (Product Management)',
        description: 'Join Michael Chen for a 1-on-1 resume review and mock interview for those targeting PM roles.',
        date: new Date('2026-04-27T14:00:00Z'),
        location: 'Computer Science Block Room 302',
        organizedBy: michael
      }
    ]);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
