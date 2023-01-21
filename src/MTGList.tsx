import MTG from "./MTG";

const MTGList = (props: any) => {
  return (
    <ul>
      {props.mtgCards.map((movie: any) => (
        <MTG
          key={movie.id}
          name={movie.name}
          price={movie.price}
          id={movie.id}
          image={movie.image}
        />
      ))}
    </ul>
  );
};

export default MTGList;
