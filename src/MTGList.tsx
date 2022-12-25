import React from "react";
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
          image_uri={movie.image_uri}
        />
      ))}
    </ul>
  );
};

export default MTGList;
