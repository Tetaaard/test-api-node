const User = require("../model/User");
module.exports.saveUser = async (data) => {
  // on peut décider ici si on renvoit ou non toutes les données de la Db. ex: "__v" etc
  const user = new User(data);
  return await user.save();
};
