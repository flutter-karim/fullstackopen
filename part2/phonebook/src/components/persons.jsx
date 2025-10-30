export const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.delete(person.id, person.name)}>
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
