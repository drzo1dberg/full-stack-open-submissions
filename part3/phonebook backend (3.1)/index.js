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
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
