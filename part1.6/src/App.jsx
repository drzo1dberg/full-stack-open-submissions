import { useState } from 'react'

const App = () => {

  const [rating, setRating] = useState({
    good: 0, neutral:0, bad: 0
  })
  const setToRating = (e) => {
    const newRating = {
      ...rating,
      [e.target.name]: ++e.target.value
    }
    setRating(newRating)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <button name='good' value={rating.good} onClick={setToRating}>good</button>
      <button name='neutral' value={rating.neutral} onClick={setToRating}>neutral</button>
      <button name='bad' value={rating.bad} onClick={setToRating}>bad</button>
      <br />
      <h1>statistics</h1>
      <br />
      <p>good {rating.good}</p>
      <p>neutral {rating.neutral}</p>
      <p>bad {rating.bad}</p>

    </div>
  )
}

export default App