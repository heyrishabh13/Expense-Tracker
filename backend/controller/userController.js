const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await User.findAll();
    users.forEach((user) => {
      if (user.email === email) {
        res.status(201).send("User already created!");
        return;
      }
    });
    const user = await User.create(req.body);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(201).send(`User created successfully`);
  } catch (error) {
    res.status(500).send(error.message);
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

    // Plain text comparison (temporary!)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        // NEVER return password!
      },
      // In real app you would add: token: jwt.sign(...)
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
