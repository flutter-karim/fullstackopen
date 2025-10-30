import { useState, useEffect } from "react";
import { Filter } from "./components/filter";
import { PersonForm } from "./components/personForm";
import { Persons } from "./components/persons";
import phoneBookService from "./services/phonebook";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneBookService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [persons]);

  const handelName = (e) => {
    setNewName(e.target.value);
  };
  const handelNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name.toLowerCase());
    const index = names.indexOf(newName.toLowerCase());

    if (index !== -1) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with an new one?`
      );
      if (!confirmUpdate) return;

      const updatedPerson = { ...persons[index], number: newNumber };

      phoneBookService
        .updateItem(updatedPerson)
        .then((response) => {
          console.log(response);
          setPersons([]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };

      phoneBookService.addNew(newObject).then((response) => {
        console.log(response);
        setPersons([]);
      });

      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (!confirmDelete) return;

    phoneBookService.deleteItem(id).then((response) => {
      setPersons([]);
      console.log(response);
    });
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter value={filter} onChange={handleFilterChange} />

        <h3>Add a new</h3>
        <PersonForm
          name={newName}
          number={newNumber}
          onChangeName={handelName}
          onChangeNumber={handelNumber}
          onSubmit={handelSubmit}
        />

        <h2>Numbers</h2>
        <Persons
          persons={filteredPersons}
          filter={filter}
          delete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
