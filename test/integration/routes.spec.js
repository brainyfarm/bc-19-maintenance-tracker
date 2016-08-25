// const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Index', () => {
  it('loads correctly', (done) => {
    request(app).get('/').expect(200, done);
  });
});

describe('Login', () => {
  it('loads correctly',  (done) => {
    request(app).get('/login').expect(200, done);
  });
});

describe('Signup', () => {
  it('loads correctly',  (done) => {
    request(app).get('/signup').expect(200, done);
  });
});
