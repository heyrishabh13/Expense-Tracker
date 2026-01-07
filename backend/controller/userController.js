const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringValid(str) {
  if (str == undefined || str == null || str.length === 0) {
    return true;
  } else {
    return false;
  }
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      isStringValid(name) ||
      isStringValid(email) ||
      isStringValid(password)
    ) {
      return res.status(400).json({ err: "Bad Parameters" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      console.log(err);
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: "Successfully created new user" });
    });
  } catch (error) {
    res.status(500).json(err);
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const users = await User.findAll();
//     if (!users) {
//       res.status(404).send("User not found");
//       return;
//     }
//     // res.status(201).send(users);
//     users.forEach((user) => {
//       console.log(typeof user.name, typeof user.password);
//       if (user.email === email && user.password === password) {
//         res.status(201).send("login successful!");
//         return;
//       } else if (user.email === email && user.password !== password) {
//         res.status(201).send("Password didn't match");
//         return;
//       } else {
//         res.status(201).send("Wrong Credentials");
//       }
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const generateAccessToken = (id) => {
  return jwt.sign(
    { userId: id },
    "ajfdfadfdfjifwjefjfjwifjwijafiawfjifwaewjifiefjw"
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Success
    bcrypt.compare(password, user.password, (err, response) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            // NEVER return password!
          },
          token: generateAccessToken(user.id),

          // In real app you would add: token: jwt.sign(...)
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  signup,
  login,
};
