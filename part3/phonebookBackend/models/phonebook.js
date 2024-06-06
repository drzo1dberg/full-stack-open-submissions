const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: [true, "Name is required"] },
  number: {
    type: String,
    minlength: 3,
    required: [true, "Number is required"],
    validate: {
      validator: (v) => /^\d{2,3}-\d*$/.test(v),
      message: (msg) => `${msg.value} is not a valid phone number`,
    },
  },
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("PhonebookEntry", phonebookSchema);
