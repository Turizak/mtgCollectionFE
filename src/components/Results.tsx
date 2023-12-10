import React from 'react'
import Button from './AddToBtn'
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//MUI Custom Theme

declare module "@mui/material/styles" {
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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#BB2649",
      },
      secondary: {
        main: "#26BB98",
      },
    },
  });

// eslint-disable-next-line react/prop-types
function Results({ card }) {

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
            <ThemeProvider theme={theme}>
        {
        // eslint-disable-next-line react/prop-types
        card.map((item)=>
        <div key={item.id}>
            <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, marginTop: 3}} elevation={12}>
              <img src={item.image_uris.small}alt="card picture"/>
              <Typography
                component="h2"
                variant="h5"
                textAlign="center"
                sx={{ marginTop: 1}}
              >
                {item.name}
              </Typography>
              <Typography
                component="p"
                variant="h6"
                textAlign="center"
                sx={{marginBottom: 1}}
              >
                {item.prices.usd > 0 ? `$${item.prices.usd}` : 'Price Not Available'}
              </Typography>
              <Button id={item.id} name={item.name} price={item.prices.usd}/>
            </Paper>
        </div>
        )
        }
        </ThemeProvider>
        </div>
  )
}

export default Results