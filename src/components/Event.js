import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Convert start time to a readable format
  const startTime = new Date(event.start.dateTime).toLocaleTimeString();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li>
      <div>{event.summary}</div>
      <div>{startTime}</div>
      <div>{event.location}</div>
      <button onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="details">Details section content goes here</div>
      )}
    </li>
  );
};

export default Event;
