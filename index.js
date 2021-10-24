const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const { connectDatabase } = require("./config/database");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDatabase();

app.use("/api/user", user);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
