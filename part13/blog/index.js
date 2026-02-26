require("dotenv").config();
const express = require("express");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingRouter = require("./controllers/readinglists");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "id is required" });
  }

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return response.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    const msg =
      error.parent?.message ||
      error.original?.message ||
      error.message ||
      "Database error";

    return response.status(400).json({
      error: [msg],
    });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 8899;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
