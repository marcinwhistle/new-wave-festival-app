const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

// Helmet middleware for secure HTTP headers
app.use(helmet());

//import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

// connects our backend code with the database

const dbURI =
  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://Lemarczini:${process.env.DB_PASS}@cluster0.54dq3zf.mongodb.net/NewVaveDB?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/NewWaveDB';

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = process.env.DB_URL;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!', socket.id);
});

module.exports = server;
