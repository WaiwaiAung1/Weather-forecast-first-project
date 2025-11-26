import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [city,setCity] =useState("");
    const navigate =useNavigate();

const handleSubmit =(e)=>{
    e.preventDefault();
    if(city.trim()){
        navigate(`/weather/${city}`);
    }
}

return(
    <div style={{textAlign:"center" ,marginLeft:"400px"}}>
        <h2>🍀 WELCOME TO WAI WEATHER FORECAST 🍀</h2>
        <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
            <input type="text" placeholder="Enter City Name (eg.Osaka)" 
            value={city} onChange={(e)=>setCity(e.target.value)} 
            style={{padding:"8px", width:"400px"}}/>
            <button type="submit"
             style={{marginLeft:"10px",padding:"8px"}}>Search</button>
        </form>
    </div>
)
}