/** @format */

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://itscharukadeshan:${password}@cluster0.qjsqgi9.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const persons = mongoose.model("persons", personSchema);

if (process.argv.length >= 4) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new persons({
    name: name,
    number: number,
  });

  newPerson.save().then(() => {
    console.log("New person created:");
    console.log(newPerson);
    mongoose.connection.close();
  });
} else {
  persons.find({}).then((result) => {
    console.log("All persons:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
