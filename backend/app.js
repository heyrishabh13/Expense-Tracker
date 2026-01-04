const express = require("express");
const db = require("./utils/db-connection");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
