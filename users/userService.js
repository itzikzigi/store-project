const { readAllUsers, writeToUSer, getUserByEmail } = require("./dal.js");
const joi = require("joi");
const bcrypt = require("bcrypt");
const schema = joi.object({
  name: joi.string().alphanum().min(1).required(),
  email: joi.string().email(),
  password: joi.string().min(8).pattern(new RegExp("[^[a-zA-Z0-9]{3,30}$]")),
});

const addUser = async (data) => {
  try {
    schema.validate(data);
    let check = await getUserByEmail(data.email);
    if (check !== null) throw new Error("email already exist");
    let crypt = await bcrypt.hash(data.password, 10);
    data.password = crypt;
    await writeToUSer(data);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

const logIn = async (data) => {
  try {
    let users = await readAllUsers();
    let user = users.find(
      (obj) =>
        obj.email === data.email &&
        bcrypt.compareSync(data.password, obj.password)
    );
    if (user === undefined) throw new Error("incorrect email or password");
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { addUser, logIn };
