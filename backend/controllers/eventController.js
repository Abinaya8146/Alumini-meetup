import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Private
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate('organizedBy', 'name email company');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      organizedBy: req.user._id,
    });
    
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
