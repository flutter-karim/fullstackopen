import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import PersonModel from "./models/Person.js";

dotenv.config();

const app = express();

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

app.get("/info", (req, res) => {
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>${currentDate}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = persons.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send(`No user found with id ${userId}`);
  }
  res.send(persons[userIndex]);
});

app.delete("/api/persons/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = persons.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).send(`No user found with id ${userId}`);
  }

  const updatedPersons = persons.filter((user) => user.id !== userId);
  persons = updatedPersons;

  res.status(200).send("deleted");
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const newId = Math.floor(Math.random() * 1000000000).toString();

  if (!name) {
    return res.status(400).json({ error: "name is missing" });
  }

  if (!number) {
    return res.status(400).json({ error: "number is missing" });
  }

  const nameIndex = persons.findIndex((user) => user.name === name);

  if (nameIndex !== -1) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const numberIndex = persons.findIndex((user) => user.number === number);

  if (numberIndex !== -1) {
    return res.status(400).json({ error: "number must be unique" });
  }

  const newPerson = {
    id: newId,
    name,
    number,
  };

  persons.push(newPerson);

  res.status(201).send(newPerson);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
