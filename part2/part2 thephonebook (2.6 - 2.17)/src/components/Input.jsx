const Input = (props) => {
    return props.value != null ? (
      <div>
        {props.text}
        <input value={props.value} type={props.type} onChange={props.onChange} />
      </div>
    ) : (
      <div>
        {props.text}
        <input type={props.type} onChange={props.onChange} />
      </div>
    );
  };
export default Input