import React, { useState } from "react";

const NumberOfEvents = ({ id, setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState("32");

  const handleInputChange = (e) => {
    const value = e.target.value;
    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = "Only positive numbers are allowed";
    } else {
      infoText = "";
      setCurrentNOE(value); // Update the value of current number of events
      setNumberOfEvents(value); // Update the value of numberOfEvents with the new value
    }
    setErrorAlert(infoText);
  };

  return (
    <div id={id} className="number-of-events-container">
      <h4 className="number-of-events-title" htmlFor="number-of-events-input">
        Number of Events:{" "}
      </h4>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
