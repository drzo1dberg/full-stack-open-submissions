const Header = ({course}) => <h1>{course}</h1>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => course.map((parts) =>(<Part name={parts.name} exercises={parts.exercises} key={parts.id} />))
const Total = ({course}) => {
  let sum = 0
  course.forEach(parts => {
    sum+=parts.exercises
  });
  return(
    <h2><strong>total of {sum} exercises</strong></h2>
  )
}
const Course = ({course}) => {
    return(
      <section>
        <div>
          <Header course={course.name}/>
          <Content course={course.parts}/>
          <Total course={course.parts}/>
        </div>
      </section>
    )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return <Course course={course}/>
}
export default App