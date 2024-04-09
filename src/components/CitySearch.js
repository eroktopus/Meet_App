import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
    setShowSuggestions(true);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  return (
    <div id="city-search-container">  
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
};

export default CitySearch;
