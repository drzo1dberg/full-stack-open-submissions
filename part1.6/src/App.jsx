import { useState } from 'react'

const Statistics = ({avgState, posPerState, ratingState}) =>{
  return (
    <div>
      <h1>statistics</h1>
      <br />
      <p>good {ratingState.good}</p>
      <p>neutral {ratingState.neutral}</p>
      <p>bad {ratingState.bad}</p>
      <p>all {ratingState.total}</p>
      <p>average {avgState}</p>
      <p>positive {posPerState} %</p>
    </div>
  )
}
const App = () => {

  const [rating, setRating] = useState({
    good: 0, neutral:0, bad: 0, total: 0
  })
  const [avg, setAvg] = useState(0)
  const [posPer, setPosPer] = useState(0)
  const score = {good: 1, neutral: 0, bad: -1}
  const averageScore = (score.good * rating.good) + (score.bad * rating.bad)
  const calcPositivePercentage = (rating.good / rating.total) * 100

  const handleButtonClick = (e) => {
    const newRating = {
      ...rating,
      [e.target.name]: ++e.target.value,
      total: rating.total + 1
    }
    setRating(newRating)
    setAvg(averageScore)
    setPosPer(calcPositivePercentage)
    
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <button name='good' value={rating.good} onClick={handleButtonClick}>good</button>
      <button name='neutral' value={rating.neutral} onClick={handleButtonClick}>neutral</button>
      <button name='bad' value={rating.bad} onClick={handleButtonClick}>bad</button>
      <br />
      <Statistics avgState={avg} posPerState={posPer} ratingState={rating} />      
    </div>
  )
}

export default App