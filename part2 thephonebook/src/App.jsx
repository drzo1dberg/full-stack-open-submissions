import { useState, useEffect } from "react";
import CheckForDuplicate from "./components/CheckForDuplicate";
import Phonebook from "./components/Phonebook";
import Search from "./components/Search";
import Input from "./components/Input";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState([]);
  const [infoMsg, setInfomsg] = useState(null);
  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPhonebook) => setPersons(initialPhonebook))
      .catch((e) => console.error("intialGet crashed", e));
  }, [persons]);
  const handleDelete = (props) => {
    window.confirm("do you want to delete this entry?") &&
      phonebookService
        .removeEntry(props)
        .catch((e) =>
          console.error("the phonebook entry is already deleted ", e)
        );
  };
  const handleForm = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim() ? newNumber : "",
    };
    switch (CheckForDuplicate(persons, newPerson)) {
      case false: {
        phonebookService
          .create(newPerson)
          .then((resp) => setPersons(persons.concat(resp.data)))
          .catch((e) => console.error("addition of a new entry crashed", e));
        setInfomsg(`Added '${newPerson.name}' to the phonebook`);
        setTimeout(() => {
          setInfomsg(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
        break;
      }
      case 1: {
        const entry = persons.find((p) => p.name === newPerson.name);
        const changedEntry = { ...entry, number: newPerson.number };
        window.confirm(
          `Do you want to change the number for ${changedEntry.name} ?`
        ) &&
          phonebookService
            .updateEntry(changedEntry.id, changedEntry)
            .then((resp) =>
              setPersons(
                persons.map((n) => (n.id !== changedEntry.id ? n : resp.data))
              )
            )
            .catch((e) => console.error("updating the entry failed", e));
        setNewName("");
        setNewNumber("");
        break;
      }
      default:
        setNewName("");
        setNewNumber("");
        break;
    }
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
      <Notification message={infoMsg} />
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
      <div>
        <h2>Numbers</h2>
        <ul>
          <Phonebook
            onClick={handleDelete}
            entries={query.length <= 0 ? persons : query}
          />
        </ul>
      </div>
    </div>
  );
};
export default App;
