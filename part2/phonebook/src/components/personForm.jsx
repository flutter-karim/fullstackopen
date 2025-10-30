export const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <div>
          name:{" "}
          <input type="text" value={props.name} onChange={props.onChangeName} />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            value={props.number}
            onChange={props.onChangeNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
