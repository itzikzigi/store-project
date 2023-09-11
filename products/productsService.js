const dal = require("./dal");

const getAllProducts = async () => {
  try {
    let product = await dal.readAll();
    return Promise.resolve(product);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getProductByID = async (id) => {
  try {
    let files = await dal.readOne(id);
    if (files === undefined) throw new Error("Error!! item does not exist");
    return Promise.resolve(files);
  } catch (err) {
    return Promise.reject(err);
  }
};

const addNewProduct = async (newProduct) => {
  try {
    const add = await dal.create(newProduct);
    console.log(add);
    console.log("new item added");
    return Promise.resolve(add);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProduct = async (id, body) => {
  try {
    const updated = await dal.update(body, id);
    return Promise.resolve(updated);
  } catch (error) {
    return Promise.reject(error);
  }
};
const deleteProduct = async (id) => {
  try {
    const del = await dal.delete(id);
    return Promise.resolve(del);
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateQuantity = async (id, action) => {
  try {
    const product = await getProductByID(id);
    let newQuantity = product[0].quantity;
    if (action == "+") newQuantity++;
    if (action == "-" && newQuantity > 0) newQuantity--;
    await dal.update({ quantity: newQuantity }, id);
    return await getProductByID(id);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getAll: getAllProducts,
  getByID: getProductByID,
  addNew: addNewProduct,
  update: updateProduct,
  delete: deleteProduct,
  updateQuantity: updateQuantity,
};
