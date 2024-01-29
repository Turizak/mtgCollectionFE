import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Paper, Typography, Container, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from '@tanstack/react-query';

function Results({ item }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);

  const baseURL = import.meta.env.VITE_APIURL;
  const token = auth.accessToken;

  const { mutate } = useMutation({
    mutationFn: addCard,
  });

  async function addCard(body: any) {
      const response = await fetch(baseURL + '/api/v1/account/cards', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const commits = await response.json();
      commits?.status === 200 || 201 ? setAdded(true) : setAdded(false);
  }

  async function clickHandler() {
    const cardObject = {
      scry_id: `${item.id}`,
      name: `${item.name}`,
      price: `${item.prices.usd}`,
      quantity: +`${quantity}`,
      image_uris: {
        small: `${item.image_uris.small}`,
        normal: `${item.image_uris.normal}`,
        large: `${item.image_uris.large}`,
        png: `${item.image_uris.png}`,
        art_crop: `${item.image_uris.art_crop}`,
        border_crop: `${item.image_uris.border_crop}`,
      },
    };
    mutate(cardObject);
  }

  return (
    <div>
      <Container>
        {item.length === 0 ? (
          <span>No Results</span>
        ) : (
          <div key={item.id}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: "15.625rem",
                padding: 2,
                margin: 1,
              }}
              elevation={3}
            >
              <img src={item.image_uris.small} alt="card picture" />
              <Typography
                component="h2"
                variant="subtitle1"
                textAlign="center"
                sx={{ marginTop: 1 }}
              >
                {item.set_name.length > 25
                  ? item.set_name.slice(0, 22) + '...'
                  : item.set_name}
              </Typography>
              <Typography component="p" variant="h6" textAlign="center">
                ${item.prices.usd}
              </Typography>
              <Container sx={{ display: 'flex', margin: 2 }}>
                <TextField
                  variant="outlined"
                  id="qty"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <Button
                  variant="contained"
                  sx={{ marginLeft: 1 }}
                  onClick={clickHandler}
                >
                  {added == false ? <AddIcon /> : 'Added!'}
                </Button>
              </Container>
            </Paper>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Results;
