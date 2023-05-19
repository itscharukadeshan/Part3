/** @format */

const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const persons = mongoose.model("persons", personSchema);
const add = "./tem.text";

if (process.argv.length >= 4) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new persons({
    name: name,
    number: number,
  });

  newPerson.save().then(() => {
    console.log(
      `added ${newPerson.name} number ${newPerson.number} to phonebook`
    );
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
