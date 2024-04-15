import React, { useState, useEffect } from "react";
import { InfoAlert, ErrorAlert } from "./components/Alert";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents"; // Import NumberOfEvents component
import EventList from "./components/EventList";
import { getEvents, extractLocations } from "./api";

import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState(""); // Add state for errorAlert

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    };
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>meetApp</h1>
      {/* <h3>Choose your nearest city to see the latest events!</h3> */}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <div className="search-and-events-container">
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          id="unique-id"
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
        />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
