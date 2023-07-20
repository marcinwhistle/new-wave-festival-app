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
    const concertsById = await Concert.findById(req.params.id);
    if (!concertsById) res.status(404).json({ message: 'Not Found...' });
    else res.json(concertsById);
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
    const deletedConcert = await Concert.findByIdAndDelete(req.params.id);
    if (deletedConcert) {
      res.json(deletedConcert);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByArtist = async (req, res) => {
  try {
    const performer = req.params.performer;
    const perfomersConcert = await Concert.find({ performer: performer });
    if (perfomersConcert.length > 0) {
      res.json(perfomersConcert);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const genresConcert = await Concert.find({ genre: genre });
    if (genresConcert.length > 0) {
      res.json(genresConcert);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const minPrice = req.params.price_min;
    const maxPrice = req.params.price_max;
    const priceRangedConcert = await Concert.find({
      price: { $gt: minPrice, $lt: maxPrice },
    });
    if (priceRangedConcert.length > 0) {
      res.json(priceRangedConcert);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const dayNumber = req.params.day;
    const theDayConcert = await Concert.find({ day: dayNumber });
    if (theDayConcert.length > 0) {
      res.json(theDayConcert);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
