import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Sort the allLocations array alphabetically
    const sortedLocations = allLocations.slice().sort((a, b) => a.localeCompare(b));
    setSuggestions(sortedLocations);
  }, [allLocations]);

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
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("")
  };

  return (
    <div id="city-search-container" data-testid="app-container">  
    <h4 htmlFor="city">Featured Cities: </h4>
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions &&
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li className="suggestion-item" onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          ))}
          <li className="see-all-cities-btn" key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      }
    </div>
  );  
}

// Define PropTypes
CitySearch.propTypes = {
  allLocations: PropTypes.array.isRequired,
  setCurrentCity: PropTypes.func.isRequired
  // setInfoAlert: PropTypes.func.isRequired // Add setInfoAlert to PropTypes
};


export default CitySearch;