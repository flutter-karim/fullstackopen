import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-12345678" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handelName = (e) => {
    setNewName(e.target.value);
  };
  const handelNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name.toLowerCase());
    if (names.indexOf(newName.toLowerCase()) !== -1) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <>
      <div>
        <h2>Phonebook</h2>
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
        {persons.map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
