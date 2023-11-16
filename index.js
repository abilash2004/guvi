const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect('mongodb+srv://abilash:abilash2004@cluster0.lbgpwm8.mongodb.net/zenclass');
const db = mongoose.connection;

// Check for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema Definitions
const mentorSchema = new mongoose.Schema({
  name: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const studentSchema = new mongoose.Schema({
  name: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

const Mentor = mongoose.model('Mentor', mentorSchema);
const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

// create a Mentor
app.post('/create-mentor', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/mentors', async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// create a Student
app.post('/create-student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Assign a student to Mentor
app.post('/assign-student-to-mentor/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { students: req.body.studentId } },
      { new: true }
    ).populate('students');

    const student = await Student.findByIdAndUpdate(
      req.body.studentId,
      { mentor: mentorId },
      { new: true }
    );

    res.json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/student-mentor/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const mentor = await Mentor.findById(mentorId).populate('students');
        res.json(mentor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



// Assign or Change Mentor for a particular Student
app.put('/assign-mentor-to-student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: req.body.mentorId },
      { new: true }
    ).populate('mentor');

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/mentor-student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('mentor');
        res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// all students for a particular mentor
app.get('/students-for-mentor/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// previously assigned mentor for a particular student
app.get('/previous-mentor-for-student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    res.json(student.mentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
