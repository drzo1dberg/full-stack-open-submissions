const Phonebook = (props) => {
  return (
    props.entries &&
    props.entries?.map((entry) => {
      return (
        <li key={entry?.id}>
          {entry?.name} {entry?.number}
          <button key={entry?.id} onClick={() => props.onClick(entry?.id)}>
            delete
          </button>
        </li>
      );
    })
  );
};

export default Phonebook;
