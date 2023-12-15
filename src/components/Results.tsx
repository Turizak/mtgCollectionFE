import AddToBtn from './AddToBtn';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

function Results({ card }) {
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <ThemeProvider theme={Theme}>
        {card.map((item) => (
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
              <AddToBtn id={item.id} name={item.name} price={item.prices.usd} />
            </Paper>
          </div>
        ))}
      </ThemeProvider>
    </div>
  );
}

export default Results;
