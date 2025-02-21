const mongoose = require("mongoose");
const logger = require('../utils/logger.js');
const config = require('../utils/config.js')

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

logger.info("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    logger.info(result," connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
