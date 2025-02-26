import requests
import os
from flask import Blueprint, request, jsonify

# API Key and Endpoint
FLIGHTAWARE_API_KEY = os.environ.get('X_API_KEY')
BASE_URL = "https://aeroapi.flightaware.com/aeroapi"

### 24hour weather api
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


### plane identification api

def get_flight_ident(tail_number):
    url = f"{BASE_URL}/flights/{tail_number}"
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
        tail_number_info = response.json()
        return tail_number_info
    
    except requests.RequestException as e:
        # Handle any exceptions that occur
        return {"error": str(e)}
    

def process_flight_ident(data):
    """Process and format flight data to extract origin, destination, departure/arrival times, delays, and other relevant info."""
    if 'flights' in data:
        flights = data['flights']
        processed_data = [
            {
                'flight_ident': flight['ident'],
                'operator': flight.get('operator'),
                'aircraft_type': flight.get('aircraft_type'),
                'origin': {
                    'code': flight['origin'].get('code'),
                    'city': flight['origin'].get('city'),
                    'name': flight['origin'].get('name'),
                    # 'scheduled_out': flight.get('scheduled_out'),
                    # 'estimated_out': flight.get('estimated_out'),
                    # 'actual_out': flight.get('actual_out'),
                    # 'gate_origin': flight.get('gate_origin'),
                    # 'terminal_origin': flight.get('terminal_origin'),
                },
                'destination': {
                    'code': flight['destination'].get('code'),
                    'city': flight['destination'].get('city'),
                    'name': flight['destination'].get('name'),
                    # 'scheduled_on': flight.get('scheduled_on'),
                    # 'estimated_on': flight.get('estimated_on'),
                    # 'actual_on': flight.get('actual_on'),
                    # 'gate_destination': flight.get('gate_destination'),
                    # 'terminal_destination': flight.get('terminal_destination'),
                },
                'scheduled_out': flight.get('scheduled_out'),
                'estimated_out': flight.get('estimated_out'),
                'actual_out': flight.get('actual_out'),
                'gate_origin': flight.get('gate_origin'),
                'terminal_origin': flight.get('terminal_origin'),
                'scheduled_on': flight.get('scheduled_on'),
                'estimated_on': flight.get('estimated_on'),
                'actual_on': flight.get('actual_on'),
                'gate_destination': flight.get('gate_destination'),
                'terminal_destination': flight.get('terminal_destination'),
                'registration':flight.get('registration'),
                'route': flight.get('route'),
                'route_distance': flight.get('route_distance'),
                'departure_delay': flight.get('departure_delay'),
                'arrival_delay': flight.get('arrival_delay'),
                'status': flight.get('status'),
                'filed_ete': flight.get('filed_ete'),
                'progress_percent': flight.get('progress_percent'),
            }
            for flight in flights
        ]
        return processed_data
    else:
        return {"error": "No flight data found in the provided data."}

def fetch_and_process_fligth_ident(tail_number):
    """Fetch and process weather data for an airport."""
    raw_data = get_flight_ident(tail_number)
    if 'error' in raw_data:
        return raw_data  # Return error if occurred
    
    return process_flight_ident(raw_data)




flightaware_routes = Blueprint("flightaware", __name__)

@flightaware_routes.route("/airport_weather", methods=["GET"])
def get_airport_weather():
    airport_code = request.args.get('airport_code')
    if not airport_code:
        return jsonify({'error': 'Airport code is required'}), 400

    # Fetch and process weather data
    weather_info = fetch_and_process_weather(airport_code)
    return jsonify(weather_info)


@flightaware_routes.route("/flight_ident", methods=["GET"])
def get_flight_identification():
    tail_number = request.args.get("tail_number")
    
    if not tail_number:
        return jsonify({'error': 'Tail Number code is required'}), 400
    
    ident_info = fetch_and_process_fligth_ident(tail_number)
    return jsonify(ident_info)