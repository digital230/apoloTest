export default (db) => {
  const User = db.collection('users');

  try {
    return {
      Query: {
        allUsers: async (root, args) => {
          let users = await User.find({}).toArray();
          return {success: true, data: users}
        }
      },
      Mutation: {
        insertUser: async (root, {name}) => {
          let user = await User.insert({name});
          return {success: true, msg: 'user created'}
        }
      }
    }
  } catch(e) {
    console.log(e, 'user query');
  }
}
