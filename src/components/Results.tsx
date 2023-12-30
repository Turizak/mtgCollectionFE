import { useState } from 'react';
import { Paper, Typography, Container, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './material ui/Theme';
import { useMutation } from '@tanstack/react-query';

//MUI Custom Theme

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

interface Props {
  id: number;
  name: string;
  set_name: string;
  prices: PropsPrices;
  quantity: number;
  image_uris: PropsImages;
}

interface PropsPrices {
  usd: string;
  usd_foil: string | null;
  usd_etched: string | null;
}

interface PropsImages {
  small: string;
  normal: string | null;
  large: string | null;
  png: string | null;
  art_crop: string | null;
  border_crop: string | null;
}

function Results({ key, item }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const baseURL = import.meta.env.VITE_APIURL;
  const token = localStorage.token

  const { mutate } = useMutation({
    mutationFn: addCard,
  });

  async function addCard(body: any) {
    try {
      const response = await fetch(`${baseURL}/api/v1/account/cards`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const commits = await response.json();
      commits?.status === 200 || 201 ? setAdded(true) : setAdded(false);
    }
    catch (error) {
      console.error(error)
    }
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
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ThemeProvider theme={Theme}>
        {item.length === 0 ? (
          <span>No Results</span>
        ) : (
          <div key={key}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                padding: 2,
                margin: 1,
              }}
              elevation={12}
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
                  color="secondary"
                  sx={{ marginLeft: 1 }}
                  onClick={clickHandler}
                >
                  {added == false ? <AddIcon /> : 'Added!'}
                </Button>
              </Container>
            </Paper>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default Results;
