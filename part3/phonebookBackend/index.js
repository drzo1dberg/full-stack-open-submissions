const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phonebook = require("./models/phonebook");
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan((tokens, req, resp) => {
    return [
      tokens.method(req, resp),
      tokens.url(req, resp),
      tokens.status(req, resp),
      tokens.res(req, resp, "content-length"),
      "-",
      tokens["response-time"](req, resp),
      "ms",
      tokens["body"](req),
    ].join(" ");
  })
);
app.get("/api/persons", (req, resp) => {
  Phonebook.find({}).then((entries) => {
    resp.json(entries);
  });
});
app.get("/info", (req, resp) => {
  const count = Phonebook.count();
  const date = new Date();
  resp.send(
    `<div> <p>Phonebook has info for ${count} </p><p>${date}</p></div>`
  );
});
app.get("/api/persons/:id", (req, resp) => {
  Phonebook.findById(req.params.id).then((entry) => {
    resp.json(entry);
  });
});
app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  Phonebook.findByIdAndDelete(id).then((entry) => {
    resp.json(entry);
    resp.status(204).end();
  });
});
app.post("/api/persons", (req, resp) => {
  const body = req.body;
  // const duplicateCheck = phonebook.find((e) => e.name === body.name);
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
  /*   if (duplicateCheck) {
    return resp.status(400).json({
      error: "name must be unique",
    });
  } */
  const phonebookEntry = new Phonebook({
    name: body.name,
    number: body.number,
  });
  phonebookEntry.save().then((savedPbEntry) => {
    resp.json(savedPbEntry);
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
