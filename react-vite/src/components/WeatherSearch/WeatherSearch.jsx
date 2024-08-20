import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetWeatherData } from '../../redux/flightaware';
import { format } from 'date-fns';
import "./weatherdata.css"

const WeatherSearch = () => {
    const [airportCode, setAirportCode] = useState('');
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.flightAwareReducer);


    const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (airportCode) {
            dispatch(thunkGetWeatherData(airportCode));
        }
    };

    return (
        <div className="weather-search-container">
            <h1 className="heading">Airport Weather Search</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <label className="form-label">Airport Code:</label>
                <input
                    type="text"
                    value={airportCode}
                    onChange={(e) => setAirportCode(e.target.value)}
                    placeholder="Enter airport code ex:KSQL"
                    className="form-input"
                />
                <button type="submit" className="view-details-button">Get Weather</button>
            </form>

            {weatherData && weatherData.data && weatherData.data.length > 0 ? (
                <div className="weather-data">
                    <h2 className="data-heading">Weather Data</h2>
                    {weatherData.data.map((item, index) => (
                        <div key={index} className="data-item">
                            <p>Airport Code: {item.airport_code}</p>
                            <p>Cloud Friendly: {item.cloud_friendly}</p>
                            <p>Temperature: {item.temperature}°C / {celsiusToFahrenheit(item.temperature).toFixed(1)}°F</p>
                            <p>Wind Speed: {item.wind_speed} m/s</p>
                            <p>Time: {format(new Date(item.time), 'MMMM d, yyyy h:mm a')}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-data">No weather data available.</p>
            )}
        </div>
    );
};


export default WeatherSearch;