import Button from "./Button";
const MTG = (props: any) => {
  let baseURL = import.meta.env.VITE_APIURL;

  async function addCardHandler() {
    const response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        scry_id: `${props.id}`,
        name: `${props.name}`,
        price: `${props.price}`,
        quantity: 1,
      }),
    });
  }
  return (
    <li>
      <img src={props.image} alt="card image" />
      <h2>{props.name}</h2>
      <h3>{props.id}</h3>
      <p>${props.price}</p>
      <Button onClick={addCardHandler}>Add to Collection</Button>
    </li>
  );
};

export default MTG;
