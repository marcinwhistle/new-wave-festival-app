const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  {
    id: 3,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  {
    id: 4,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find((t) => t.id === parseInt(req.params.id)));
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id, author, text };
  db.push(newTestimonial);
  res.status(200).json({ messege: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;
  let updatedTestimonial;
  db.forEach((testimonial) => {
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

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const index = db.findIndex((testimonial) => testimonial.id == id);
  if (index !== -1) {
    res.status(200).json({ message: 'OK' });
  } else {
    restart.status(404).json({ message: 'Testimonial not found' });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
