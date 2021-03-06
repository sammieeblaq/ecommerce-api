const User = require("../models/user.models");
const encryption = require("../middleware/encryption");
const DB = require("../utils/db.utils");

const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

module.exports = {
  async signUp(req, res) {
    const { password, email, name } = req.body;
    if (!password && !email && !name) {
      res.json({
        status: 401,
        message: "Kindly fill in the details to create an account",
      });
    } else {
      try {
        const hashedPassword = await encryption.encryptPassword(password);
        const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
        const userObj = {
          name: name,
          email: email,
          avatar: avatar,
          password: hashedPassword,
        };
        const user = await User.create(userObj);
        return res.json({
          status: 201,
          user: user,
          message: "User Created Successfully",
        });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email && !password) {
      res.json({
        status: 400,
        message: "Fill in the right details please",
      });
    } else {
      try {
        const user = await DB.findByEmail(User, email);
        if (!user) {
          return res.status(401).json({
            message: "User does not exist!!! Please sign up",
          });
        }
        const result = await encryption.validatePassword(password, user);
        if (result) {
          const newObj = {
            id: user._id,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
          const token = jwt.sign(newObj, process.env.JWT_SECRET, {
            expiresIn: "3 days",
            algorithm: "HS256",
          });
          res.cookie("t", token, {
            expiresIn: new Date() + 9999,
            httpOnly: true,
          });
          res.json({
            status: 201,
            message: "Auth Successful",
            token: token,
          });
        }
      } catch (error) {
        res.json({ message: error });
        // console.log(error);
      }
    }
  },
};
