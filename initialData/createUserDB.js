const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");
const bcrypt = require("bcrypt");

const createUser = async (db) => {
  let user = [
    {
      name: "itzik",
      id: "1",
      email: "itzik@gmail.com",
      password: "Aa123456",
      isAdmin: true,
    },
  ];
  let pass = user[0].password;
  user[0].password = bcrypt.hashSync(pass, 10);
  await db.insertMany(user);
  return user;
};
const checkDB = async () => {
  try {
    await client.connect();
    const db = client.db("server_project").collection("users");
    if ((await db.find({}).toArray()).length === 0) {
      await createUser(db);
      console.log("Users DB created successfully");
    }
    return await db.find().toArray();
  } catch (error) {
    return error;
  }
};
module.exports = checkDB;
