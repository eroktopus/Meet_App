import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Convert start time to a readable format
  const startTime = new Date(event.start.dateTime).toLocaleTimeString();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <div className="event-info">
        <div className="city">{event.location}</div>
        <div className="number-of-events-input">Number of Events</div>
      </div>
      <div>{event.summary}</div>
      <div>{startTime}</div>
      <button className="event-details-button" onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="details-section">Details section content goes here</div>
      )}
    </li>
  );
};

export default Event;
