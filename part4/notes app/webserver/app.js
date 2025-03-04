const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note");
const logger = require("./utils/logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});
app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SyntaxError") {
    return response
      .status(400)
      .json({ error: ` validation failed: ${error.message} ` });
  }
  next(error);
};
// handler of requests with result to errors
app.use(errorHandler);
module.exports = {
  app,
};
