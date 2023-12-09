import React from 'react'
import Button from "@mui/material/Button";
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

function Results({ card }) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
            <ThemeProvider theme={theme}>
        {
        card.map((item, index)=>
        <div key={index}>
            <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, marginTop: 1}} elevation={12}>
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
                ${item.prices.usd}
              </Typography>
              <Button
                sx={{ display: "flex", margin: "auto"}}
                color="secondary"
                variant="contained"
                // onClick={addCardHandler}
                // disabled={disabled}
              >
                Add to Collection
              </Button>
            </Paper>
        </div>
        )
        }
        </ThemeProvider>
        </div>
  )
}

export default Results