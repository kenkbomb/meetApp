import { useState } from "react";
//import {fetchData} from "./api.js"
export const NumberOfEvents=({setCurrentNOE,setErrorAlert})=>
{
 
 const [noe,setnoe] = useState('32');

    const handleInputChanged =(event)=>
    {
        const num = event.target.value;
        if(isNaN(num))
            {
                setErrorAlert(" non alphanumeric and negative numbers are NOT allowed")
                //console.log("not a valid value or number, please rephrase...")
            }
            else{
        setCurrentNOE(num);
        setnoe(num);
        console.log("number is " + num);
        setErrorAlert("");
            }
       
        
    }

    return(
        <div id = 'number-of-events'>
            <p>Number of Events</p>
            <input type="text" value={noe} id="numberEventsInput"  className="numberEventsInput" onChange={handleInputChanged} defaultValue={32}></input>
        </div>
    )
}