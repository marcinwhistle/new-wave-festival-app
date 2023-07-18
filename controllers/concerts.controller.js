const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not Found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCon = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCon = async (req, res) => {
  try {
    const con = await Concert.findByIdAndDelete(req.params.id);
    if (con) {
      res.json(con);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByArtist = async (req, res) => {
  try {
    const performer = req.params.performer;
    const art = await Concert.find({ performer: performer });
    if (art) {
      res.json(art.length > 0);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const gen = await Concert.find({ genre: genre });
    if (gen.length > 0) {
      res.json(gen);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const minPrice = req.params.price_min;
    const maxPrice = req.params.price_max;
    const conc = await Concert.find({
      price: { $gt: minPrice, $lt: maxPrice },
    });
    if (conc.length > 0) {
      res.json(conc);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const theDay = await Concert.find({ day: day });
    if (theDay.length > 0) {
      res.json(theDay);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
