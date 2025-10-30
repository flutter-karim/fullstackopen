import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handelName = (e) => {
    setNewName(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handelSubmit}>
          <div>
            name: <input value={newName} onChange={handelName} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map((person, i) => (
          <p key={i}>{person.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
