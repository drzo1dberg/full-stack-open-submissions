import { useState } from 'react'

const Summary = ({arr, sel}) => {
  return(
    <p>has {arr[sel]} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint32Array(anecdotes.length))
  const [selected, setSelected] = useState(0)
  const handleClick = () => {
    const r = Math.floor(Math.random()*anecdotes.length)
    setSelected(r)
  }
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const mostVoted = (a) => a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)

  return (
    <div>
      <h1>Anectdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Summary arr={points} sel={selected} />
      <button onClick={() => handleVote()}>vote</button><button onClick={()=>handleClick()}>cycle through anecdotes</button>
      <h1>Most inspiring Anectdote</h1>
      {anecdotes[mostVoted(points)]}
      <Summary arr={points} sel={mostVoted(points)} />
    </div>
  )
}

export default App