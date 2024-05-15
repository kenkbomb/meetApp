
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import { getEvents,extractLocations } from './api';
import { NumberOfEvents } from './components/NumberOfEvents';
import './App.css';
import { useState,useEffect } from 'react';
import { InfoAlert,ErrorAlert,WarningAlert } from './components/alert';
import CityEventsChart from './components/cityEventsChart';
import EventsGenresChart from './components/EventsGenresChart'



function App() {
const [events, setEvents] = useState([]);
const [currentNOE, setCurrentNOE] = useState(32);
const [allLocations, setAllLocations] = useState([]);
const [currentCity, setCurrentCity] = useState("See all cities");
const [infoAlert,setInfoAlert] = useState("");
const [errorAlert,setErrorAlert] = useState("");
const [warningAlert,setWarningAlert] = useState("");
const [isLoaded,setIsLoaded] = useState(false);
const [waitMessage,setWaitMessage] = useState("PLEASE WAIT, LOADING EVENTS...");
const fetchData = async () => {
  const allEvents = await getEvents();
  const filteredEvents = currentCity === "See all cities" ?
    allEvents :
    allEvents.filter(event => event.location === currentCity)
  setEvents(filteredEvents.slice(0, currentNOE));
  setAllLocations(extractLocations(allEvents));
  setIsLoaded(true);
}

useEffect(() => {
  if(isLoaded)
    {
      setWaitMessage("please choose a number of events to view above");
    }
  if(navigator.onLine)
    {
      setWarningAlert("");
    }
    else{
      setWarningAlert("This events list has not been updated since last used ONLINE")
    }
  fetchData();
}, [currentCity,currentNOE]);

  return (
    <div className="App">
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert}/>:null}
        {errorAlert.length ? <ErrorAlert text = {errorAlert}/> :null}
        {warningAlert.length ? <WarningAlert text = {warningAlert}/> : null}
      </div>
      <p className='headerTitle'>MeetApp</p>
      <CitySearch allLocations={allLocations} setInfoAlert={setInfoAlert} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} /> 
      <div className='charts-container'>
        <EventsGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      {events.length ? <EventList events={events}/>:<p>{waitMessage}</p>  }
    
    </div>
  );
}

export default App;