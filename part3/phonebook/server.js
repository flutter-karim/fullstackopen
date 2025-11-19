import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import PersonModel from "./models/Person.js";

dotenv.config();

const app = express();

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  req.status(404).send({ error: "unknown endpoint" });
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors("*"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", async (req, res) => {
  const persons = await PersonModel.find({});
  res.json(persons);
});

app.get("/info", async (req, res) => {
  const persons = await PersonModel.find({});
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>${currentDate}`
  );
});

app.get("/api/persons/:id", async (req, res) => {
  const userId = req.params.id;

  const person = await PersonModel.findById(userId);

  if (!person) {
    return res.status(404).json({ error: `No user found with id ${userId}` });
  }

  res.json(person);
});

app.delete("/api/persons/:id", async (req, res) => {
  const userId = req.params.id;

  const person = await PersonModel.findByIdAndDelete(userId);

  if (!person) {
    return res.status(404).send(`No user found with id ${userId}`);
  }

  res.status(200).send("deleted");
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is missing" });
  }

  if (!number) {
    return res.status(400).json({ error: "number is missing" });
  }

  const checkExists = await PersonModel.findOne({ name });

  if (checkExists) {
    const update = await PersonModel.findByIdAndUpdate(
      checkExists._id,
      { number },
      {
        new: true,
      }
    );

    return res.status(200).json(update);
  }

  const newPerson = {
    name,
    number,
  };

  const person = await PersonModel.create(newPerson);

  res.status(201).send(person);
});

app.use(errorHandler);

app.use(unknownEndpoint);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
