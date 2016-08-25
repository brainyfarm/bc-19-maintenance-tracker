if (process.env.NODE_ENV !== "test") {
  process.exit(1);
}

module.exports = {
  user: {
    name: 'John Doe',
    email: 'jondoe@gmail.com',
    password: 'pa55w0rd',
  },

  request: {
    description: "A new request",
    type: "repair"
  }
}
