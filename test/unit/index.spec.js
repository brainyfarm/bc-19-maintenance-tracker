const expect = require('chai').expect;

describe('models/index', () => {
  it('returns the request model', () => {
    const models = require('../../models');
    expect(models.Request).to.be.ok;
  });

  it('returns the user model', () => {
    const models = require('../../models');
    expect(models.User).to.be.ok;
  });
});