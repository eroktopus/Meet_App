import React, { useState } from "react";

const NumberOfEvents = ({ id, setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32); // Default to 32 events

  const handleInputChange = (e) => {
    const value = e.target.value; // Directly get the input value
    let infoText = "";

    if (isNaN(value) || value <= 0) {
      infoText = "Only positive numbers are allowed";
      setErrorAlert(infoText);
    } else {
      setNumberOfEvents(Number(value)); // Update the state with the new value
      setCurrentNOE(Number(value)); // Update the current number of events
      setErrorAlert("");
    }
  };

  return (
    <div id={id} className="number-of-events-container">
      <h4 className="number-of-events-title" htmlFor="number-of-events-input">
        Number of Events:
      </h4>
      <input
        type="number" // Ensure the input type is number
        id="number-of-events-input"
        className="number-of-events-input"
        value={numberOfEvents}
        onChange={handleInputChange} // Update the value on change
      />
    </div>
  );
};

export default NumberOfEvents;
