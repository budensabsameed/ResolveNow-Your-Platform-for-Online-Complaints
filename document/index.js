//  Backend
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Complaint = require('./models/Complaint');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/complaintsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(console.error);

// POST complaint
app.post('/complaints', async (req, res) => {
  try {
    const { name, email, complaint } = req.body;
    const newComplaint = new Complaint({ name, email, complaint });
    await newComplaint.save();
    res.status(201).json({ success: true, message: 'Complaint recorded' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET all complaints
app.get('/complaints', async (req, res) => {
  try {
    const list = await Complaint.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);


