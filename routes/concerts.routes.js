const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller.js');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.addCon);

router.put('/concerts/:id', ConcertController.updateCon);

router.delete('/concerts/:id', ConcertController.deleteCon);

router.get('/concerts/performer/:performer', ConcertController.getByArtist);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertController.getByPrice
);

router.get('/concerts/price/day/:day', ConcertController.getByDay);

module.exports = router;
