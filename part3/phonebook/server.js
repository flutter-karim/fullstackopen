import express from "express";
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
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

  res.status(204);
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

app.listen(3001, () => {});
