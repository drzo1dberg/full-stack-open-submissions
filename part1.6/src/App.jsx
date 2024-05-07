import { useState } from 'react'

const StatisticsLine = ({data, sign, text}) => sign ?<p>{text}: {data} {sign}</p> : <p>{text}: {data}</p>

const Statistics = ({avgState, posPerState, good, bad, neutral, total}) =>{
  return (
    <div>
      <h1>statistics</h1>
      <br />
      <StatisticsLine data={good} text={'good'}/>
      <StatisticsLine data={neutral} text={'neutral'} />
      <StatisticsLine data={bad} text={'bad'} />
      <StatisticsLine data={total} text={'total'} />
      <StatisticsLine data={avgState} text={'avg'} />
      {posPerState ? <StatisticsLine data={posPerState} sign={'%'} text={'positive'} /> : ''}
    </div>
  )
}

const Button = ({text, onSmash}) => <button onClick={() =>{onSmash(text)}}> {text} </button>

const App = () => {

  const [goodRating, setGood] = useState(0)
  const [neutralRating, setNeutral] = useState(0)
  const [badRating, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [posPer, setPosPer] = useState(0)

  const totalRating = goodRating + neutralRating + badRating
  const score = {good: 1, neutral: 0, bad: -1}
  const averageScore = (score.good * goodRating) + (score.bad * badRating)
  const calcPositivePercentage = (goodRating / totalRating) * 100

  const calcStatistics = () => {
    setAvg(averageScore)
    setPosPer(calcPositivePercentage)
  }
  const handleButtonClick = (props) => {
    switch (props) {
      case 'good':
          setGood(goodRating+1)
        break;
        case 'neutral':
          setNeutral(neutralRating+1)
        break;
        case 'bad':
          setBad(badRating+1)
        break;    
      default:
        break;
    }
    return calcStatistics()
  }

  return (
    <div>
      <h1>give feedback</h1>
    <br/>
         <Button text='good' onSmash={handleButtonClick} />
         <Button text='neutral' onSmash={handleButtonClick}/>
         <Button text='bad' onSmash={handleButtonClick}/>
        <br />
       {totalRating ? <Statistics avgState={avg} posPerState={posPer} bad={badRating} good={goodRating} neutral={neutralRating} total={totalRating} /> : <br /> }      
    </div>
  )
}

export default App