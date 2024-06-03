require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phonebook = require("./models/phonebook");
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(express.static("dist"));
app.use(express.json());
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
app.use(cors());
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
app.get("/api/persons/:id", (req, resp, next) => {
  Phonebook.findById(req.params.id).then((entry) => {
    if(entry) {
      resp.json(entry);
    } else {
      resp.status(404).end();
    }
  })
  .catch((error) => next(error))
});
app.delete("/api/persons/:id", (req, resp, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then((entry) => {
      resp.status(204).end();
    })
    .catch((error) => next(error));
});
app.post("/api/persons", (req, resp, next) => {
  const body = req.body;
  if (!body.name) {
    return resp.catch((error) => next(error));
    /* .status(400).json({
      error: "name is missing",
    }); */
  }
  if (!body.number) {
    return resp.catch((error) => next(error));
    /* .status(400).json({
      error: "number missing",
    }); */
  }
  const phonebookEntry = new Phonebook({
    name: body.name,
    number: body.number,
  });
  phonebookEntry.save().then((savedPbEntry) => {
    resp.json(savedPbEntry);
  });
});
app.put("/api/persons/:name", (req, resp, next) => {
  const body = req.body;
  const phonebookEntry = {
    name: body.name,
    number: body.number,
  };
  Phonebook.findOneAndUpdate(phonebookEntry.name, phonebookEntry.number, {
    new: true,
  })
    .then((updatedEntry) => {
      resp.json(updatedEntry);
    })
    .catch((error) => next(error));
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
// handler of requests with result to errors
app.use(errorHandler);
