const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not Found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const isTaken = await Seat.findOne({ day, seat });
    if (isTaken) {
      res.status(400).json({ message: 'Seat has been taken' });
      return;
    }
    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// const { day, seat, client, email } = req.body;

//   //check if seat is already taken
//   const isTaken = db.seats.some((s) => s.day === day && s.seat === seat);
//   if (isTaken) {
//     res.status(400).json({ message: 'Seat has been taken' });
//     return;
//   }

//   const id = uuidv4();
//   const newSeat = { id, day, seat, client, email };
//   db.seats.push(newSeat);
//   req.io.emit('seatsUpdated', db.seats);
//   res.status(200).json({ message: 'OK' });
// });

exports.updateSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, {
      day,
      seat,
      client,
      email,
    });
    if (updatedSeat) {
      res.json(updatedSeat);
    } else res.status(404).json({ message: 'Not Found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const delatedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (delatedSeat) {
      res.json(delatedSeat);
    } else res.status(404).json({ message: 'Not Found' });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err });
  }
};
