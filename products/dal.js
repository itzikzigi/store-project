const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("server_project").collection("products");
    return db;
  } catch (error) {
    return error;
  }
};

const readAllProducts = async () => {
  try {
    const db = await connectToDB();
    let data = await db.find().toArray();
    if (data.length === 0) throw new Error("DB is empty");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getOneProduct = async (productID) => {
  try {
    const db = await connectToDB();
    const data = await db.find({ id: Number(productID) }).toArray();
    if (data.length) return data;
    throw new Error("no data found");
  } catch (error) {
    return error.message;
  }
};

const createProduct = async (data) => {
  try {
    const db = await connectToDB();
    const add = await db.insertOne(data);
    return Promise.resolve(add);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProduct = async (data, productId) => {
  try {
    const db = await connectToDB();
    const update = await db.updateOne(
      { id: Number(productId) },
      { $set: { ...data } }
    );
    return update;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (Pid) => {
  try {
    const db = await connectToDB();
    const del = await db.deleteOne({ id: Number(Pid) });
    return del;
  } catch (error) {
    return error;
  }
};

module.exports = {
  readAll: readAllProducts,
  readOne: getOneProduct,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
};
