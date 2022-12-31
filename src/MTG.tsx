import Button from "./Button";
const MTG = (props: any) => {
  return (
    <li>
      <img src={props.image} alt="card image" />
      <h2>{props.name}</h2>
      <h3>{props.id}</h3>
      <p>${props.price}</p>
      <Button>Add to Collection</Button>
    </li>
  );
};

export default MTG;
