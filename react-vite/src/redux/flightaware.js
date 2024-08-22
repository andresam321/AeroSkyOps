const GET_WEATHER_DATA = "getWeatherDate/GET_WEATHER_DATA"
const GET_FLIGHT_IDENT = "getFlightIdent/GET_FLIGHT_IDENT"

const getWeatherData = (data) => ({
    type: GET_WEATHER_DATA,
    payload: data
})

const getFlightData = (data) => ({
    type: GET_FLIGHT_IDENT,
    payload: data
})


export const thunkGetWeatherData = (airportCode) => async (dispatch) => {
    try {
        // Make the request to your API endpoint with the airport code as a query parameter
        const response = await fetch(`/api/flightaware/airport_weather?airport_code=${airportCode}`);
        
        // Check if the response is OK (status code in the range 200-299)
        if (response.ok) {
            // Parse the response data as JSON
            const data = await response.json();
            
            // Log the data for debugging
            console.log("Weather Data:", data);

            // Check for errors in the data and dispatch action if no errors
            if (!data.error) {
                dispatch(getWeatherData(data));
            } else {
                // Handle any data-specific errors (optional)
                console.error('Error in weather data:', data.error);
            }
        } else {
            // Handle non-OK responses (e.g., 404, 500 errors)
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Fetch error:', error);
    }
};

export const thunkGetFlightIdent = (tail_number) => async (dispatch) => {
    try {
        // Make the request to your API endpoint with the airport code as a query parameter
        const response = await fetch(`/api/flightaware/flight_ident?tail_number=${tail_number}`);
        
        // Check if the response is OK (status code in the range 200-299)
        if (response.ok) {
            // Parse the response data as JSON
            const data = await response.json();
            
            // Log the data for debugging
            console.log("flight identification:", data);

            // Check for errors in the data and dispatch action if no errors
            if (!data.error) {
                dispatch(getFlightData(data));
            } else {
                // Handle any data-specific errors (optional)
                console.error('Error in weather data:', data.error);
            }
        } else {
            // Handle non-OK responses (e.g., 404, 500 errors)
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Fetch error:', error);
    }


}

function flightAwareReducer(state = {}, action){
    switch(action.type) {
        case GET_WEATHER_DATA:{
            return {...state, data: action.payload}
    

        }
        case GET_FLIGHT_IDENT: {
            return {...state, data: action.payload}
        }
        default:
            return state;
    }
}

export default flightAwareReducer;