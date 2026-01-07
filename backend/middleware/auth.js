const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const { userId } = jwt.verify(
      token,
      "ajfdfadfdfjifwjefjfjwifjwijafiawfjifwaewjifiefjw"
    );
    console.log("userId >>>>", userId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    // console.log(JSON.stringify(user));
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  authenticate,
};
