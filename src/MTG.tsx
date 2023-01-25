import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    alert("Added!");
  }

  return (
    <Paper elevation={3}>
      <ul>
        <Box>
          <img src={props.image} alt="card image" />
        </Box>
        <Box paddingX={1}>
          <Typography variant="h6" component="h2" align="center">
            <h2>{props.name}</h2>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" component="p" align="center">
            <p>${props.price}</p>
          </Typography>
        </Box>
        <Button
          sx={{ display: "flex", margin: "auto" }}
          variant="contained"
          onClick={addCardHandler}
        >
          Add to Collection
        </Button>
      </ul>
    </Paper>
  );
};

export default MTG;
