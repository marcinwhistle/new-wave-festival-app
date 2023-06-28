const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller.js');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

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
  req.io.emit('seatsUpdated', db.seats);
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
