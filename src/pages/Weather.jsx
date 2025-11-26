import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { city } = useParams();

    const API_KEY = "bf43daa76f60387b27f37b34ad6620a2";

    useEffect(
        () => {
            const weatherFetch = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
                    if (!res.ok) throw new Error("City not Found");

                    const data = await res.json();
                    setWeather(data);
                } catch (err) { setError(err.message) }
                finally {
                    setLoading(false);
                }
            }; weatherFetch()
        }, [city])

    if (loading)
        return (<p style={{ textAlign: "center" }}>Loading weather data</p>);
    if (error)
        return (
            <div style={{ textAlign: "center" }}>
                <p >Error:{error}</p>
                <Link to="/"> Go back</Link>
            </div>
        )

    const {lat,lon} =weather.coord;

    return(
        <div style={{textAlign:"center",marginLeft:"400px"}}>
        <div>
            <h2> Weather in :{weather.name}</h2>
            <p> Temp:{weather.main.temp}°C</p>
            <p>Humidity:{weather.main.humidity}</p>
            <p> {weather.weather[0].description}</p>
        </div>

        <div style={{ height:"300px" , width:"100%" }}>
            <MapContainer center={[lat,lon]} zoom={15} style={{ height:"300px" ,width:"500px"}}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
                attribution='&copy; OpenStreetMap  contributors'/>
                <Marker position={[lat,lon]}>
                    <Popup>{weather.name}<br/> {weather.weather[0].description}</Popup>
                </Marker>
            </MapContainer>
        </div>
        <Link to="/">Seach another city</Link>
        </div>
    )

}