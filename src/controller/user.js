const User = require("../model/User");
const { validateCreateUser, validateUpdateUserMail, validateCreateUserTest } = require("../controller/user.validate");

module.exports.createUser = async (name, email) => {
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) throw new Error("user already exist");

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();

    return newUser;
  } catch (err) {
    throw err;
  }
};

// module.exports.updateUserMail = async (currentEmail, newMail) => {
//   try {
//     let newEmailExist = await User.exists({ email: newMail });

//     if (newEmailExist) throw new Error("Email already taken");

//     let user = await User.findOneAndUpdate({ email: currentEmail }, { email: newMail }, { new: true });

//     if (!user) throw new Error("user does not exist");

//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

module.exports.updateUserField = async (field, currentValue, newValue) => {
  try {
    let newValueExist = await User.exists({ [field]: newValue });

    if (newValueExist) throw new Error("Email already taken");

    let user = await User.findOneAndUpdate({ [field]: currentValue }, { [field]: newValue }, { new: true });

    if (!user) throw new Error("user does not exist");

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.createUserTest = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    await User.findOne({ email: req.body.email });

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();

    return res.send(newUser);
  } catch (err) {
    next(err);
  }
};
