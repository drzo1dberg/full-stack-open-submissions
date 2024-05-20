const express = require("express");
const app = express();
app.use(express.json());
let phonebook = [
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
const generateId = () => {
  const minInt = Math.ceil(
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0
  );
  const maxInt = Math.floor((minInt + 1) * 27);
  const randId = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  return randId;
};
app.get("/api/persons", (req, resp) => {
  resp.json(phonebook);
});
app.get("/info", (req, resp) => {
  const count =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  const date = new Date();
  resp.send(
    `<div> <p>Phonebook has info for ${count} </p><p>${date}</p></div>`
  );
});
app.get("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const phonebookEntry = phonebook.find((entry) => entry.id === id);
  if (phonebookEntry) {
    resp.json(phonebookEntry);
  } else {
    resp.status(404).end();
  }
});
app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);
  resp.status(204).end();
});
app.post("/api/persons", (req, resp) => {
  const body = req.body;
  const duplicateCheck = phonebook.find((e) => e.name === body.name);
  if (!body.name) {
    return resp.status(400).json({
      error: "name is missing",
    });
  }
  if (!body.number) {
    return resp.status(400).json({
      error: "number missing",
    });
  }
  if (duplicateCheck) {
    return resp.status(400).json({
      error: "name must be unique",
    });
  }
  const phonebookEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phonebook = phonebook.concat(phonebookEntry);
  resp.json(phonebook);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
