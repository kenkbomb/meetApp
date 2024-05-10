// src/components/CitySearch.js

import { useState,useEffect } from "react";

const CitySearch = ({allLocations,setCurrentCity,setInfoAlert}) => {
  const [showSuggestions,setShowSuggestions] = useState(false);
  const [query,setQuery] = useState("");
  const [suggestions,setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
    setInfoAlert("");
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

    return (
      <div id="city-search">
      <input type = "text" className="city" value={query} placeholder="search for a city" onFocus={()=>{setShowSuggestions(true)}} onChange={handleInputChanged}/>
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li onClick={handleItemClicked} key='See all cities'>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
      </div>
    )

    
   }
   
   export default CitySearch;