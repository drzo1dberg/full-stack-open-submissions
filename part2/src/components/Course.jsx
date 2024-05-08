import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

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
export default Course