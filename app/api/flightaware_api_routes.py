import requests
import os
from flask import Blueprint, request, jsonify

# API Key and Endpoint
FLIGHTAWARE_API_KEY = os.environ.get('x-apikey')
BASE_URL = "https://aeroapi.flightaware.com/aeroapi"

def get_weather_data(airport_code):
    """Fetch weather data for a given airport code."""
    url = f"{BASE_URL}/airports/{airport_code}/weather/observations"
    headers = {
        'x-apikey': f'{FLIGHTAWARE_API_KEY}'  
    }
    
    try:
        # Make the request to the API
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses
        
        # Log the raw response for debugging
        print("Raw Response Status Code:", response.status_code)
        print("Raw Response Headers:", response.headers)
        print("Raw Response Body:", response.text)
        
        # Parse the JSON data
        weather_data = response.json()
        return weather_data
    
    except requests.RequestException as e:
        # Handle any exceptions that occur
        return {"error": str(e)}

def process_weather_data(data):
    """Process and format weather data."""
    if 'observations' in data:
        observations = data['observations']
        processed_data = [
            {
                'airport_code': obs.get('airport_code'),
                'cloud_friendly': obs.get('cloud_friendly'),
                'temperature': obs.get('temp_air'),
                'wind_speed': obs.get('wind_speed'),
                'wind_friendly': obs.get('wind_friendly'),
                'time': obs.get('time')
            }
            for obs in observations
        ]
        return processed_data
    else:
        return {"error": "No observations found in data"}


def fetch_and_process_weather(airport_code):
    """Fetch and process weather data for an airport."""
    raw_data = get_weather_data(airport_code)
    if 'error' in raw_data:
        return raw_data  # Return error if occurred
    
    return process_weather_data(raw_data)


weather_routes = Blueprint("flightaware", __name__)

@weather_routes.route("/airport_weather", methods=["GET"])
def get_airport_weather():
    airport_code = request.args.get('airport_code')
    if not airport_code:
        return jsonify({'error': 'Airport code is required'}), 400

    # Fetch and process weather data
    weather_info = fetch_and_process_weather(airport_code)
    return jsonify(weather_info)