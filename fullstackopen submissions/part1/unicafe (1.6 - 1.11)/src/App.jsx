import { useState } from 'react'

const StatisticsLine = ({data, sign, }) => sign ? <td>{data}{sign}</td> : <td>{data}</td>

const Statistics = ({avgState, posPerState, good, bad, neutral, total}) =>{
  return (
    <div>
      <h1>statistics</h1>
      <br />
      <table>
        <thead></thead>
        <tbody>
        <tr><td>good</td><StatisticsLine data={good}/></tr>       
        <tr><td>neutral</td><StatisticsLine data={neutral}/></tr>      
        <tr><td>bad</td><StatisticsLine data={bad}/></tr>        
        <tr><td>total</td><StatisticsLine data={total}/></tr>       
        <tr><td>avg</td><StatisticsLine data={avgState}/></tr>      
        <tr><td>positive</td>{posPerState ? <StatisticsLine data={posPerState} sign={'%'}/> : ''}</tr>
        </tbody>
      </table>
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