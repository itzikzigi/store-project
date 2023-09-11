const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

const connectToDB = async () => {
  client.connect();
  const db = client.db("server_project").collection("users");
  return db;
};

const readAllUsers = async () => {
  try {
    const db = await connectToDB();
    const data = await db.find().toArray();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const db = await connectToDB();
    const user = await db.findOne({ email });
    return user;
  } catch (error) {
    return error;
  }
};

const writeToUSer = async (data) => {
  try {
    const db = await connectToDB();
    const write = await db.insertOne(data);
    return Promise.resolve("writing to usersDb success", write);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { readAllUsers, writeToUSer, getUserByEmail };
