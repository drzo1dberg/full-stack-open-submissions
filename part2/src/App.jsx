const Header = ({course}) => <h1>{course}</h1>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => course.map((parts) =>(<Part name={parts.name} exercises={parts.exercises} key={parts.id} />))
const Total = ({course}) => <h2><strong>total of {course.reduce((sum, course ) => sum+=course.exercises, 0)} exercises</strong></h2>
const Course = ({course}) => {
    return(
      course.map(courseObj => (
        <section key={courseObj.id}>
        <div>
          <Header course={courseObj.name}/>
          <Content course={courseObj.parts}/>
          <Total course={courseObj.parts}/>
        </div>
      </section>
      ))  
    )
}
const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Course course={course}/>
}
export default App