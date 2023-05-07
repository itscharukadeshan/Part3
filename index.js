/** @format */

const express = require("express");
const app = express();
const port = 3001;

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

app.listen(port, () => {
  console.log(`express sever is running at ${port}`);
});
