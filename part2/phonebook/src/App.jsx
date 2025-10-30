import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]);
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
        <div>
          filter shown with:
          <input value={filter} onChange={handleFilterChange} />
        </div>

        <h3>Add a new</h3>
        <form onSubmit={handelSubmit}>
          <div>
            <div>
              name: <input value={newName} onChange={handelName} />
            </div>
            <div>
              number: <input value={newNumber} onChange={handelNumber} />
            </div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
        {filteredPersons.length === 0 ? (
          <p>Sorry, you dont have any person with name: {filter}</p>
        ) : null}
      </div>
    </>
  );
}

export default App;
