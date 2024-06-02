const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const pbName = process.argv[3];
const pbNumber = process.argv[4];

const url = `mongodb+srv://wuhansoldier:${password}@geldwelt.ojdqkeh.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=geldwelt`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookSchema);

if (pbName === undefined && pbNumber === undefined) {
  PhonebookEntry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry);
    });
    mongoose.connection.close();
  });
}
if (pbName !== undefined && pbNumber !== undefined) {
  const pbEntry = new PhonebookEntry({
    name: pbName,
    number: pbNumber,
  });
  pbEntry.save().then((result) => {
    console.log(`added ${result?.name} number ${result?.number} to phonebook`);
    mongoose.connection.close();
  });
}
