const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((c) => c.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  const newConcert = { id, performer, genre, price, day, image };
  db.concerts.push(newConcert);
  res.status(200).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
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
    db.concerts.splice(index, 1);
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex((concert) => concert.id == id);
  if (index !== -1) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

module.exports = router;
