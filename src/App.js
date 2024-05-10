
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents,extractLocations } from './api';
import { NumberOfEvents } from './components/NumberOfEvents';
import './App.css';
import { useState,useEffect } from 'react';
import { InfoAlert,ErrorAlert } from './components/alert';



function App() {
const [events, setEvents] = useState([]);
const [currentNOE, setCurrentNOE] = useState(32);
const [allLocations, setAllLocations] = useState([]);
const [currentCity, setCurrentCity] = useState("See all cities");
const [infoAlert,setInfoAlert] = useState("");
const [errorAlert,setErrorAlert] = useState("");
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
}, [currentCity,currentNOE]);

  return (
    <div className="App">
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert}/>:null}
        {errorAlert.length ? <ErrorAlert text = {errorAlert}/> :null}
      </div>
      <CitySearch allLocations={allLocations} setInfoAlert={setInfoAlert} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} /> 
      
      
      <EventList events={events}/>
    
    </div>
  );
}

export default App;