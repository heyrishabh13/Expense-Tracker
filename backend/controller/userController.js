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

module.exports = {
  signup,
};
