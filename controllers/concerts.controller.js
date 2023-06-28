const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not Found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addCon = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateCon = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await Concert.findByIdAndUpdate(req.params.id, {
      performer,
      genre,
      price,
      day,
      image,
    });
    if (con) {
      res.json(con);
    } else res.status(404).json({ message: 'Not Found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteCon = async (req, res) => {
  try {
    const con = await Concert.findByIdAndDelete(req.params.id);
    if (con) {
      res.json(con);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
