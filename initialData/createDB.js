const axios = require("axios").default;
const products = axios.get("https://fakestoreapi.com/products");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

const createProducts = async (db) => {
  try {
    const items = (await products).data;
    items.forEach((item) => {
      item.quantity = Math.round(Math.random() * 100);
    });

    const write = await db.insertMany(items);
    return write;
  } catch (error) {
    return error;
  }
};

const checkDB = async () => {
  try {
    await client.connect();
    const db = client.db("server_project").collection("products");
    if ((await db.find({}).toArray()).length === 0) {
      await createProducts(db);

      return console.log("products DB created successfully");
    }
  } catch (error) {
    return error;
  }
};
module.exports = checkDB;
