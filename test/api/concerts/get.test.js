const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const request = chai.request;
const expect = require('chai').expect;
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: '6464b5947009b0abb2d1517a',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg',
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '6464b5947009b0abb2d1517b',
      performer: 'Maybell Haley',
      genre: 'Pop',
      price: 40,
      day: 1,
      image: '/img/uploads/hdfh42sd213.jpg',
    });
    await testConcertTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return concerts by performer', async () => {
    const res = await request(server).get(
      '/api/concerts/performer/Rebekah Parker'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('should return concerts by genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('should return concerts by price', async () => {
    const res = await request(server).get('/api/concerts/price/20/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should return concerts by day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
});
