/** @format */

const express = require("express");
const app = express();
const port = 3004;
app.use(express.json());
const morgan = require("morgan");

app.use((req, res, next) => {
  morgan("tiny")(req, res, () => {});
  next();
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("express server up and running");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();
  const time = now.toLocaleTimeString("en-US");
  const timeZoneOffset = now.getTimezoneOffset();
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  res.send(
    ` phone book has info for ${persons.length} people <br />
    
      ${dayOfWeek} ${month} ${year} ${time} GMT ${timeZoneOffset} (${timeZoneName})`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((persons) => persons.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: `person with ${id} not found` });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const nameExists = persons.some((p) => p.name === body.name);

  if (nameExists) {
    return res.status(400).json({
      error: "name already exists.name must be unique",
    });
  }

  const numberExists = persons.some((p) => p.number === body.number);

  if (numberExists) {
    return res.status(400).json({
      error: "number already exists.number must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);

  res.json(person);
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.listen(port, () => {
  console.log(`express sever is running at ${port}`);
});
