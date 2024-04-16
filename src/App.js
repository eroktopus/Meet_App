import React, { useState, useEffect } from "react";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
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
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

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

    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "You are offline. The displayed list may not be up to date."
      );
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>meetApp</h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
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
