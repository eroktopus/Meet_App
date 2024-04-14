import React, { useState } from "react";

const NumberOfEvents = ({ id, setCurrentNOE, setErrorAlert }) => {
  // Define id as a prop

  const [numberOfEvents, setNumberOfEvents] = useState("32");

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("New value:", value);
    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = "Only positive numbers are allowed";
    } else {
      infoText = "";
      console.log("Setting current NOE to:", value);
      setCurrentNOE(value);
      setNumberOfEvents(value); // Update the value of numberOfEvents directly
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
        value={numberOfEvents} // Ensure the value is always a string
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
