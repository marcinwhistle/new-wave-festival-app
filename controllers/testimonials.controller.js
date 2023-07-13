const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found...' });
    else res.json(tes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not Found...' });
    else res.json(tes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.addTes = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ messege: 'OK' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateTes = async (req, res) => {
  // const { author, text } = req.body;

  const author = sanitize(req.body.author);
  const text = sanitize(req.body.text);
  try {
    const tes = await Testimonial.findByIdAndUpdate(req.params.id, {
      author,
      text,
    });
    if (tes) {
      res.json(tes);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTes = async (req, res) => {
  try {
    const tes = await Testimonial.findByIdAndDelete(req.params.id);
    if (tes) {
      res.json(tes);
    } else res.status(404).json({ message: 'Not Found...' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
