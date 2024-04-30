import { useState } from "react";
//import {fetchData} from "./api.js"
export const NumberOfEvents=({setCurrentNOE})=>
{
 
 const [noe,setnoe] = useState('32');

    const handleInputChanged =(event)=>
    {
        const num = event.target.value;
        setCurrentNOE(num);
        setnoe(num);
        console.log("number is " + num);
        
    }

    return(
        <div id = 'number-of-events'>
            <input type="text" value={noe} id="numberEventsInput"  className="numberEventsInput" onChange={handleInputChanged} defaultValue={32}></input>
        </div>
    )
}