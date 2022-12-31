import React, { useState } from "react";
import classes from "./Login.module.css";
import MTGList from "./MTGList";
import Button from "./Button";
import Card from "./Card";

const MTGSearch = () => {
  const [myCard, setMyCard] = useState([]);
  const [myCardPic, setMyCardPic] = useState(
    "https://media.wizards.com/2022/30a/en_jiTqp9fC78.png"
  );
  const cardRef = React.useRef<HTMLInputElement>(null);
  const scryfall: any = [];

  async function fetchMTGCard() {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${cardRef?.current?.value}`
    );
    const data = await response.json();
    scryfall.push(data);
    console.log(scryfall);

    const transformedCards = scryfall.map((scryfallData: any) => {
      return {
        key: scryfallData.data[0].id,
        id: scryfallData.data[0].id,
        name: scryfallData.data[0].name,
        price: scryfallData.data[0].prices.usd,
        image_uri: scryfallData.data[0].image_uris.small,
      };
    });
    setMyCard(transformedCards);
    setMyCardPic("");
    console.log(transformedCards.image_uri);
  }

  return (
    <Card>
      <form>
        <label htmlFor="card" className={classes.label}></label>
        <input id="card" type="text" className={classes.input} ref={cardRef} />
      </form>
      <Button onClick={fetchMTGCard}>Search Scryfall</Button>
      <img src={myCardPic} alt="" />
      <MTGList mtgCards={myCard} />
    </Card>
  );
};

export default MTGSearch;
