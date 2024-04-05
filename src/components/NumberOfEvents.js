import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert, id }) => {
  const [numberOfEvents, setNumberOfEvents] = useState('32'); // Ensure default value is string

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setNumberOfEvents(value);
    }
  };

  return (
    <div id={id}>
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input 
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={numberOfEvents} // Ensure the value is always a string
        onChange={handleInputChange}
        role="textbox"
      />
    </div>
  );
};

export default NumberOfEvents;

