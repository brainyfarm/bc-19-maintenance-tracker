const env = process.env.NODE_ENV || 'development'

module.exports = {
  test: {
    secretKeyBase: '78002ab8283dc7ea7c28b39cc76f197947c93dcwea7c28b39c329327df77619e91c91'
  },
  
  development: {
    secretKeyBase: 'd69d81f7e34e89ab7218a3477619e91c91b61a7d28bf3d05371725f315f06ce9761cf'
  },

  production: {
    secretKeyBase: process.env.SECRET_KEY_BASE
  }
}[env];