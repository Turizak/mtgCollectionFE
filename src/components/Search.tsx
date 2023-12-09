/* eslint-disable no-inner-declarations */
import React from 'react'
import { useState, useEffect} from 'react';
import Results from './Results';

function Search() {
    const [card, setCard] = useState([])
    const [clicked, setClicked] = useState(false)
    const [loading, setLoading] = useState('')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      if (clicked) {
        async function fetchCards() {
          const response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=${inputValue}`)
          const data = await response.json();
          setCard([...data.data])
          setLoading('')
        }
          fetchCards()
      }
    }, [clicked])  

    function handleClick(){
      setClicked(true)
      setLoading('Loading...')
    }

  return (
    <div>
      <input value={inputValue} onChange={(e)=> setInputValue(e.target.value)} />
      <button onClick={handleClick}>Search</button>
      <p>{loading}</p>
    <Results card={card} />

    </div>
  )
}

export default Search