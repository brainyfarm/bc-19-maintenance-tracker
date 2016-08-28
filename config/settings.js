const env = process.env.NODE_ENV || 'development'

module.exports = {
  test: {
    secretKeyBase: '78002ab8283dc7ea7c28b39cc76f197947c93dcwea7c28b39c329327df77619e91c91'
  },
  
  development: {
    secretKeyBase: 'd69d81f7e34e89ab7218a3477619e91c91b61a7d28bf3d05371725f315f06ce9761cf',
    adminUser: {
      name: 'John Doe',
      email: 'admin@mail.com',
      password: 'pa55w9rd',
      role: 'admin',
      isAdmin: true
    }
  },

  production: {
    secretKeyBase: process.env.SECRET_KEY_BASE,
    adminUser: {
      name: process.env.ADMIN_USER_NAME,
      email: process.env.ADMIN_USER_EMAIL,
      password: process.env.ADMIN_USER_PASSWORD,
      isAdmin: true,
      role: 'admin'
    }
  }
}[env];