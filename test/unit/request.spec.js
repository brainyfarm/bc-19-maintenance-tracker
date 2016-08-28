const Request = require('../../models').Request;
const User = require('../../models').User;
const expect = require('chai').expect;
const fixtures = require('../test-helper');
const requestAttr = fixtures.request;

describe('Request model', () => {

  after(() => User.sync({ force: true }));

  beforeEach(() => {
    this.request = Request.build(requestAttr);
    this.user = User.build(fixtures.user);
    return User.sync({ force: true });
  });

  describe('.build', () => {
    it('creates a Requset instance', () => {
      expect(this.request.description).to.equal(requestAttr.description);
    });
  });

  describe('.save', () => {
    it('creates the user', () => {
      return this.user.save()
        .then((user) => {
          this.request.UserId = this.user.id;
          return this.request.save()
            .then((request) => {
              expect(request.slug).to.equal('a-new-request');
              expect(request.status).to.equal('reported');
              return Request.count()
                .then((count) => {
                  expect(count).to.equal(1);
                });
            });
        });
    });
  });

  describe('#rejected', () => {
    it('return false for approved request', () => {
      return this.user.save()
        .then((user) => {
          this.request.UserId = this.user.id;
          return this.request.save()
            .then((request) => {
              expect(request.rejected()).to.be.false
            });
        });
    });

    it('returns true for daclined request', () => {
      return this.user.save()
        .then((user) => {
          this.request.UserId = this.user.id;
          this.request.reject();
          return this.request.save()
            .then((request) => {
              expect(request.rejected()).to.be.true
            });
        });
    });
  });

  describe('#approve', () => {
    it('returns true for daclined request', () => {
      return this.user.save()
        .then((user) => {
          this.request.UserId = this.user.id;
          this.request.approve();
          return this.request.save()
            .then((request) => {
              expect(request.rejected()).to.be.false
              expect(request.approved).to.be.true
            });
        });
    });
  })

});
