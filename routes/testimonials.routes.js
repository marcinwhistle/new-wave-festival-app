const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

// router.route('/testimonials').get((req, res) => {
//   res.json(db.testimonials);
// });

router.get('/testimonials', TestimonialController.getAll);

// router.route('/testimonials/random').get((req, res) => {
//   const randomIndex = Math.floor(Math.random() * db.testimonials.length);
//   res.json(db.testimonials[randomIndex]);
// });

router.get('/testimonials/random', TestimonialController.getRandom);

// router.route('/testimonials/:id').get((req, res) => {
//   res.json(db.testimonials.find((t) => t.id === parseInt(req.params.id)));
// });

router.get('/testimonials/:id', TestimonialController.getById);

router.post('/testimonials', TestimonialController.addTes);

router.put('/testimonials/:id', TestimonialController.updateTes);

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex(
    (testimonial) => testimonial.id == id
  );
  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.status(200).json({ message: 'Testimonials removed' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

module.exports = router;
