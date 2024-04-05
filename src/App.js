// App.js

import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; 
import { getEvents } from './api'; 
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Fetch events from API when the component mounts
    const fetchData = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once

 return (
   <div className="App">
     <CitySearch />
     <EventList events={events} />
     <NumberOfEvents id="numberOfEvents" /> {/* Pass id as prop */}
   </div>
 );
}

export default App;
