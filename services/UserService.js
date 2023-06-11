const UserModel = require("../models/User");

exports.getAllUser = async () => {
  return await UserModel.find();
};

exports.checkEmail = async (user) => {
    return await UserModel.findOne({email:user.email});
  };

exports.createUser = async (user) => {
    console.log(user,'user===');
  return await UserModel.create(user);
};
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
