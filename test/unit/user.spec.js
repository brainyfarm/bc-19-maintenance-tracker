const expect = require('chai').expect;
const User = require('../../models').User;

describe('User model', () => {
  // before(() => require('../../models').sequelize.sync({ force: true }));
  let userAttr = {
    name: 'John Doe',
    email: 'jondoe@gmail.com',
    password: 'pa55w0rd',
  };

  beforeEach(() => {
    this.user = User.build(userAttr);
    return require('../../models').sequelize.sync({ force: true });
  })

  // afterEach(() => require('../../models').sequelize.sync({ force: true }))

  describe('.build', () => {
    it('creates a User instance', () => {
      expect(this.user.name).to.equal(userAttr.name);
      expect(this.user.email).to.equal(userAttr.email);
    });
  });

  describe('.save', () => {
    it('saves the user', () => {
      return this.user.save()
        .then((user) => {
          return User.count()
            .then((count) => {
              expect(count).to.equal(1);
            });
        });
    });
  })

  describe('.create', () => {
    it('creates user and hashes password', () => {
      return User.create(userAttr)
        .then((user) => {
          expect(user.isAdmin).to.be.false;
          expect(user.password).to.not.equal(userAttr.password);

          return User.count()
            .then((count) => {
              expect(count).to.equal(1);
            });
        });
    });

  });

  describe('.find', () => {

    it('finds correct user', () => {
      return this.user.save()
        .then((user) => {
          return User.find({ email: userAttr.email })
            .then((user) => {
              expect(user.email).to.equal(userAttr.email);
              expect(user.name).to.equal(userAttr.name);
            });
        });
    })
  });

  describe('.destroy', () => {
    it('deletes a user', () => {
      return this.user.save()
        .then((user) => {
          return user.destroy()
        })
        .then(() => {
          return User.count()
            .then((count) => {
              expect(count).to.equal(0);
            });
        });
    })
  });

  describe('.validPassword', () => {

    it('validate user password', () => {
      return this.user.save()
        .then((user) => {
          return User.find({ email: userAttr.email })
            .then((user) => {
              expect(user.email).to.equal(userAttr.email);
              expect(User.validPassword(user, userAttr.password)).to.be.true;
            });
        });
    })
  })

});
