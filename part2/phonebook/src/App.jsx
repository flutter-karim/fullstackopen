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
    if (names.indexOf(newName.toLowerCase()) !== -1) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([]);

      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      phoneBookService.addNew(newObject).then((response) => {
        console.log(response);
      });

      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
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
        <Persons persons={filteredPersons} filter={filter} />
      </div>
    </>
  );
}

export default App;
