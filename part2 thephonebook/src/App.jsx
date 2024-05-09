import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const handleForm = (e) => {
    e.preventDefault() 
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName(' ')
  }
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