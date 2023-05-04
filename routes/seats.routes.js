const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuidv4');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((s) => s.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  //check if seat is already taken
  const isTaken = db.seats.some((s) => s.day === day && s.seat === seat);
  if (isTaken) {
    res.status(400).json({ message: 'Seat has been taken' });
    return;
  }

  const id = uuidv4();
  const newSeat = { id, day, seat, client, email };
  db.seats.push(newSeat);
  res.status(200).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
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

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex((seat) => seat.id == id);
  if (index !== -1) {
    db.seats.splice(index, 1);
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

module.exports = router;
