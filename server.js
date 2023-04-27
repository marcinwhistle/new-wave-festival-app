const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.find((t) => t.id === parseInt(req.params.id)));
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts.find((c) => c.id === parseInt(req.params.id)));
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats.find((s) => s.id === parseInt(req.params.id)));
});
app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db.testimonials[randomIndex]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id, author, text };
  db.testimonials.push(newTestimonial);
  res.status(200).json({ messege: 'OK' });
});

app.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  const newConcert = { id, performer, genre, price, day, image };
  db.concerts.push(newConcert);
  res.status(200).json({ message: 'OK' });
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const newSeat = { id, day, seat, client, email };
  db.seats.push(newSeat);
  res.status(200).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;
  let updatedTestimonial;
  db.testimonials.forEach((testimonial) => {
    if (testimonial.id === id) {
      testimonial.author = author;
      testimonial.text = text;
      updatedTestimonial = testimonial;
    }
  });
  if (updatedTestimonial) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.put('/concerts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { performer, genre, price, day, image } = req.body;
  let updatedConcert;
  db.concerts.forEach((concert) => {
    if (concert.id === id) {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      updatedConcert = concert;
    }
  });
  if (updatedConcert) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

app.put('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;
  let updatedSeat;
  db.seats.forEach((se) => {
    if (se.id === id) {
      se.day = day;
      se.seat = seat;
      se.client = client;
      se.email = email;
      updatedSeat = se;
    }
  });
  if (updatedSeat) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ messsage: 'Seat not found' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex(
    (testimonial) => testimonial.id == id
  );
  if (index !== -1) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.delete('/concerts/:id', (req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex((concert) => concert.id == id);
  if (index !== -1) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

app.delete('/seats/:id', (req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex((seat) => seat.id == id);
  if (index !== -1) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});
app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
