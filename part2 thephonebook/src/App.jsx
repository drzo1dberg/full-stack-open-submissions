import { useState } from "react";

const Display = (props) => {
  return (
    <ul>
      {props.arr.map((line) => {
        return (
          <li key={line.id}>
            {line.name} {line.number}
          </li>
        );
      })}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "01234567", id: 1 },
    { name: "Peter Schliephake", number: "07654321", id: 2 },
    { name: "Alberto Sieef", number: "01112131", id: 3 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim() ? newNumber : "",
      id: persons.length + 1,
    };

    areTheseObjectsEqual(persons, newPerson)
      ? ""
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };
  const handleInputChange = (e) => {
    switch (e.target.type) {
      case "text":
        setNewName(e.target.value);
        break;
      case "number":
        setNewNumber(e.target.value);
        break;
      case "search":
        setQuery(search(persons, e.target.value));
        break;
      default:
        break;
    }
  };
  const search = (obj, query) =>
    obj.filter((line) =>
      JSON.stringify(line).toLowerCase().includes(query.toLowerCase())
    );
  const areTheseObjectsEqual = (first, second) => {
    for (const entry of first) {
      if (JSON.stringify(entry.name) === JSON.stringify(second.name)) {
        window.alert(`${second.name} is already added to phonebook`);
        return true;
      } else if (
        JSON.stringify(entry.number) === JSON.stringify(second.number)
      ) {
        window.alert(
          `The number ${second.number} is already added to phonebook`
        );
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search: <input type="search" onChange={handleInputChange} />
      </div>
      <br />
      <form onSubmit={handleForm}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleInputChange} />{" "}
          tel:{" "}
          <input type="number" value={newNumber} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {query.length <= 0 ? <Display arr={persons} /> : <Display arr={query} />}
    </div>
  );
};

export default App;
