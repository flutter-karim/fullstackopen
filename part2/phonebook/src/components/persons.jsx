export const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) => (
        <p key={person._id}>
          {person.name} {person.number}
          <button onClick={() => props.delete(person._id, person.name)}>
            delete
          </button>
        </p>
      ))}
      {props.persons.length === 0 ? (
        <p>Sorry, you dont have any person with name: {props.filter}</p>
      ) : null}
    </>
  );
};
