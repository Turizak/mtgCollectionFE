import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import Theme from '../material ui/Theme';
import { ThemeProvider } from '@mui/material'

interface Props {
  id: number,
  name: string,
  price: string,
  quantity: number,
  image_uris: string
}

function AddToBtn(props: Props) {
    const [clicked, setClicked] = useState(false)
    const [added, setAdded] = useState('')
    const [quantity, setQuantity] = useState('1')
  
    const baseURL = import.meta.env.VITE_APIURL;

    useEffect(()=>{
        if (clicked) {
          async function addCard() {
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
                quantity: +`${quantity}`,
                image_uris: `${props.image_uris}`
              }),
            });
            const commits = await response.json();
            commits?.status === 200 || 201
              ? setAdded("Added!")
              : setAdded("Could not add - please try another card");
          }
          addCard()
        }
      }, [clicked])
    
      function addCardHandler() {
        setClicked(true)
      }

  return (
    <ThemeProvider theme={Theme}>
    <div>
    <TextField
              variant="outlined"
              margin="normal"
              id="qty"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
      <Button
    sx={{ display: "flex", margin: "auto"}}
    color="secondary"
    variant="contained"
    onClick={addCardHandler}
  >
    {clicked === true ? `${added}`: <AddIcon />}
  </Button>
  </div>
  </ThemeProvider>
  )
}

export default AddToBtn