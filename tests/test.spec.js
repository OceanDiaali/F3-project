const mocha = require('mocha');
const chai = require('chai');

const {
  describe,
  it,
  before,
  after,
} = mocha;
// const expect = require('chai').expect; -- using destructuring below, instead
const { expect } = chai;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /orders', () => {
  // this.timeout(5000); // time to wait for a response (ms)

  before(() => {

  });

  after(() => {

  });

  // GET - all orders
  it('should return all orders', () => {
    chai.request(app)
      .get('/orders')
      .then((res) => {
        expect(res).to.have.status(200);
        // expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array');
      });
  });

  // GET - Invalid path
  it('should return Not Found', () => {
    chai.request(app)
      .get('/INVALID_PATH')
      /* .then((res) => {
        throw new Error('Path exists!');
      }) */
      .catch((err) => {
        expect(err).to.have.status(404);
      });
  });

  // POST - place new order
  it('should add new order', () => {
    chai.request(app)
      .post('/orders')
      .send({
        order: 'Queen-size burger',
      })
      .then((res) => {
        expect(res).to.have.status(201);
        // expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array').that.includes('Queen-size');
      });
  });

  // POST - Bad Request
  it('should return Bad Request', () => {
    chai.request(app)
      .post('/orders')
      .type('form')
      .send({
        order: 'Queen-size',
      })
      /* .then((res) => {
        throw new Error('Invalid content type!');
      }) */
      .catch((err) => {
        expect(err).to.have.status(400);
      });
  });
});
