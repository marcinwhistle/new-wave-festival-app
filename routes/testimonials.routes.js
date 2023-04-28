const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find((t) => t.id === parseInt(req.params.id)));
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials').get((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id, author, text };
  db.testimonials.push(newTestimonial);
  res.status(200).json({ messege: 'OK' });
});

router.route('/testimonials/:id').get((req, res) => {
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

router.route('/testimonials/:id').get((req, res) => {
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

module.exports = router;
