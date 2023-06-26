const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found..!!!.' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not Found...123' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addTes = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ messege: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTes = async (req, res) => {
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
};
