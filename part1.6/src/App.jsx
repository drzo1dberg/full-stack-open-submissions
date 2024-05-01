import { useState } from 'react'

const App = () => {

  const [rating, setRating] = useState({
    good: 0, neutral:0, bad: 0, total: 0
  })
  const [avg, setAvg] = useState(0)
  const [posPer, setPosPer] = useState(0)
  const score = {good: 1, neutral: 0, bad: -1}

  const handleButtonClick = (e) => {
    console.log(posPer)
    const newRating = {
      ...rating,
      [e.target.name]: ++e.target.value,
      total: rating.total + 1
    }
    const averageScore = (score.good * rating.good) + (score.neutral * rating.neutral) + (score.bad * rating.bad)
    const calcPositivePercentage = (rating.good / rating.total) * 100
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
      <h1>statistics</h1>
      <br />
      <p>good {rating.good}</p>
      <p>neutral {rating.neutral}</p>
      <p>bad {rating.bad}</p>
      <p>all {rating.total}</p>
      <p>average {avg}</p>
      <p>positive {posPer} %</p>

    </div>
  )
}

export default App