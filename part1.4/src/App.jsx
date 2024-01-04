const Header = (props) => {
  return(
  <>
  <h1>{props.course}</h1>
  </>
  )
}
const Part = (props) => {
  return(
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  const m1= props.courseObject.map((parts,i) =>(<Part name={parts.name} exercises={parts.exercises} key={i} />))
  return m1
}

const Total = (props) => {

  let sum = 0
  props.courseObject.forEach(parts => {
    sum+=parts.exercises
  });

  return(
    <>
    <p>Number of exercises {sum}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content courseObject={parts}/>
      <Total courseObject={parts}/>
    </div>
  )
}

export default App