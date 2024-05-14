import { useState } from "react";

const Phonebook = (props) => {
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
const AreTheseObjectsEqual = (first, second) => {
  for (const entry of first) {
    if (
      JSON.stringify(entry.name).toLowerCase() ===
        JSON.stringify(second.name).toLowerCase() &&
      second.name.length > 0
    ) {
      window.alert(`${second.name} is already added to phonebook`);
      return true;
    } else if (
      JSON.stringify(entry.number) === JSON.stringify(second.number) &&
      second.number.length > 0
    ) {
      window.alert(`The number ${second.number} is already added to phonebook`);
      return true;
    } else if (second.name.length <= 0 && second.number.length <= 0) {
      window.alert("enter valid data");
      return true;
    }
  }
  return false;
};
const Search = (obj, query) =>
  obj.filter((line) =>
    JSON.stringify(line).toLowerCase().includes(query.toLowerCase())
  );
const Input = (props) => {
  return props.value != null ? (
    <div>
      {props.text}
      <input value={props.value} type={props.type} onChange={props.onChange} />
    </div>
  ) : (
    <div>
      {props.text}
      <input type={props.type} onChange={props.onChange} />
    </div>
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
    !AreTheseObjectsEqual(persons, newPerson) &&
      setPersons(persons.concat(newPerson));
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
        setQuery(Search(persons, e.target.value));
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Input
          text={"filter book: "}
          type="search"
          onChange={handleInputChange}
        />
      </div>
      <br />
      <form onSubmit={handleForm}>
        <div>
          <Input
            text={"text: "}
            type="text"
            onChange={handleInputChange}
            value={newName}
          />
          <Input
            text={"tel: "}
            type="number"
            onChange={handleInputChange}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {query.length <= 0 ? (
        <Phonebook arr={persons} />
      ) : (
        <Phonebook arr={query} />
      )}
    </div>
  );
};
export default App;
