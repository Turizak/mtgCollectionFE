/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import Theme from './material ui/Theme';
import { ThemeProvider } from '@mui/material'

function AddToBtn(props) {
    const [clicked, setClicked] = useState(false)
    const [added, setAdded] = useState('')
  
    const baseURL = import.meta.env.VITE_APIURL;

    useEffect(()=>{
        if (clicked) {
          async function addCard() {
            const response = await fetch(`${baseURL}/api/v1/account/cards`, {
              method: "POST",
              mode: "no-cors",
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
            const commits = await response.json();
            // eslint-disable-next-line no-constant-condition
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
    <div><Button
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