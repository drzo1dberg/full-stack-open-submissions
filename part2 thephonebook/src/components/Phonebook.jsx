const Phonebook = (props) => {
    return (
      <ul>
        {props.arr.map((line) => {
          return (
            <li key={line.id}>
              {line.name} {line.number}
            </li>
          );
        })}
      </ul>
    );
  };

export default Phonebook