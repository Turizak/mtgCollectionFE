import AddToBtn from './AddToBtn';
import { Paper, Typography, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import Theme from './material ui/Theme';

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
  id: number
  name: string
  set_name: string
  prices: PropsPrices;
  quantity: number
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

function Results({ card }) {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ThemeProvider theme={Theme}>
        {card.map((item: Props) => (
          <div key={item.id}>
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
                {item.prices.usd}
              </Typography>
              <AddToBtn id={item.id} name={item.name} price={item.prices.usd} quantity={0} image_uris={''} />
            </Paper>
          </div>
        ))}
      </ThemeProvider>
    </div>
  );
}

export default Results;
