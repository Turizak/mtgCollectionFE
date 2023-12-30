import { Container, Box, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

function Footer() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          backgroundColor: "primary.main",
          zIndex: "1000"
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
              href="https://github.com/slandath/mtgCollectionFE2"
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
                }} rel="noreferrer"
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
                }} rel="noreferrer"
              >
                Tom Slanda
              </a>
            </Typography>
          </Box>
        </Container>
      </Box>
  </>
  )
}

export default Footer;
