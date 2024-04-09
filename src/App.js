import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
  
  useEffect(() => {
    fetchData();
  }, [currentCity]);

  return (
    <div className='app-title'>
    <h1>meetApp</h1>
    <div className="App">
      <div className="box-container">
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <EventList events={events} />
        <NumberOfEvents id="numberOfEvents" />
      </div>
    </div>
    </div>
  );
 }

export default App;