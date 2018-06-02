export default (db) => {
  const User = db.collections('users');

  try {
    return {
      Query: {
        users: async (root, {all}) => {
          let users = User.find({}).toArray();
          return users;
        }
      },
      Mutation: {
        insert: async (root, {name}) => {
          console.log(name)
          let user = await User.insert({name});
          console.log(user);
          return {success: true, msg: 'user created'}
        }
      }
    }
  } catch(e) {
    console.log(e, 'user query');
  }
}
