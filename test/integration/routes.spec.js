// const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Index', () => {
  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });
});
