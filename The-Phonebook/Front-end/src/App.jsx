/** @format */
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import personsService from "./service/persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import ErrNotification from "./components/ErrNotification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.log("Error retrieving persons:", error);
      });
  }, []);
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to Delete ${person.name} ?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log("Error deleting person:", error);
        });
    }
  };

  const handleNotification = () => {
    setTimeout(() => {
      setMessage("");
      setErrMessage("");
    }, 3000);
  };

  const handleReset = () => {
    setNewName("");
    setNewNumber("");
  };
  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name?.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phone book. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            );
            handleReset();
            setMessage(`${response.name}'s number has been updated`);
            handleNotification();
          })
          .catch((error) => {
            console.log("Error updating person:", error);
            handleReset();
            setErrMessage("Failed to update the number check");
            handleNotification();
          });
      } else {
        handleReset();
      }
    }
    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: newName,
      };

      personsService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          handleReset();
          setMessage(`${response.name}'s number has been added`);
          handleNotification();
        })
        .catch((error) => {
          console.log("Error creating person entry:", error);
          handleReset();
          setErrMessage("Check the number format and name are correct ");
          handleNotification();
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='px-12 py-5 w-full bg-slate-50'>
      <h2 className='text-5xl pt-4'>Phone book</h2>
      <Notification message={message} />
      <ErrNotification errMessage={errMessage} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3 className='text-3xl pt-4 pb-4'>Add new number</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3 className='text-3xl py-4 mt-4 '>Numbers </h3>
      <ul>
        {filteredPersons.map((person) => (
          <div key={person.id} className='flex flex-row  gap-2 '>
            <li className='m-2' key={person.id}>
              {person.name} {person.number}
            </li>

            <button
              type='submit'
              onClick={() => handleDelete(person.id)}
              className=' mt-2 bg-transparent hover:bg-red-400 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded'>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
