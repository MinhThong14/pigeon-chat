const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await Users.findOne({username});
        if (usernameCheck){
            return res.json({msg: "Username already used", status: false});
        }
        const emailCheck = await Users.findOne({email});
        if (emailCheck){
            return res.json({msg: "Email already used", status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({username});
        if (!user){
            return res.json({msg: "Incorrect username", status: false});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.json({msg: "Incorrect password", status: false});
        }
        delete user.password;
        return res.json({status: true, user})
    } catch (ex) {
        next(ex)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;

      const userData = await Users.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };