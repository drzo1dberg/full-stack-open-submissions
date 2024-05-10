import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const handleForm = (e) => {
    e.preventDefault() 
    const newPerson = {name: newName}
    duplicateCheck(persons, newPerson) ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName(' ')
  }
  const duplicateCheck = (arr, str) => arr.some((person) => person.name.toLowerCase().trim() === str.name.toLowerCase().trim())  
  const handleInputChange = (e) => setNewName(e.target.value)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App