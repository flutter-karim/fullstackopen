export const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
      {props.persons.length === 0 ? (
        <p>Sorry, you dont have any person with name: {props.filter}</p>
      ) : null}
    </>
  );
};
