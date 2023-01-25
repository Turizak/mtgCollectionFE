import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          backgroundColor: "primary.main",
        }}
        component="footer"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <IconButton
              href="https://github.com/slandath/mtgCollectionFE3"
              target="_blank"
              style={{ color: "white" }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "black" }}>
              Created by&nbsp;
              <a
                href="https://rakazirut.github.io"
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Rob Kazirut
              </a>
              &nbsp;and&nbsp;
              <a
                href="https://slandath.github.io"
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Tom Slanda
              </a>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
