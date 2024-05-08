const Total = ({course}) => <h2><strong>total of {course.reduce((sum, course ) => sum+=course.exercises, 0)} exercises</strong></h2>
export default Total