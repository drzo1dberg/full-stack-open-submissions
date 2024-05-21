const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => course.map((parts) =>(<Part name={parts.name} exercises={parts.exercises} key={parts.id} />))
export default Content