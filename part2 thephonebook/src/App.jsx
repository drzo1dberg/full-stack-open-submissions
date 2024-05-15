import { useState, useEffect } from "react";
import AreTheseObjectsEqual from "./components/AreTheseObjectsEqual"
import Phonebook from "./components/Phonebook"
import Search from "./components/Search"
import Input from './components/Input'
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState([]);
  useEffect(() =>  {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
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
      case "tel":
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
            type="tel"
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
