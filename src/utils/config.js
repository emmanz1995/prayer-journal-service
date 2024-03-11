const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb+srv://root:helloworld@cluster0.pt93vem.mongodb.net/TestDatabase?retryWrites=true&w=majority'
    : 'mongodb+srv://root:helloworld@cluster0.pt93vem.mongodb.net/?retryWrites=true&w=majority'

// const MONGODB_URI =
//   process.env.NODE_ENV === 'test'
//     ? process.env.TEST_MONGODB_URI : 'process.env.MONGODB_URI'

module.exports = { MONGODB_URI }
