from flask import Blueprint, redirect, request
from flask_login import login_required, current_user # type: ignore
from app.models import db, ParkingSpot, AirportArea
from app.forms import AirportAreaForm



airport_area = Blueprint("airport_area", __name__)


@airport_area.route("/all_places/with_parking_spots")
def all_places():
    airport_parkings = AirportArea.query.all()
    return {"airport": [airport_parking.area_name for airport_parking in airport_parkings]},200


@airport_area.route("/all_areas")
@login_required
def all_places_with_parking_spots():
    airport_spots = AirportArea.query.all()
    return {"airport": [airport.to_dict() for airport in airport_spots]},200


@airport_area.route('/<int:parking_id>/spots')
@login_required
def get_parking_spots(parking_id):
    airport_parking = AirportArea.query.get(parking_id)
    print(f"Fetching parking spots for parking ID: {parking_id}")
    if not airport_parking:
        return {'error': 'AirportArea not found'}, 404
    
    parking_spots = ParkingSpot.query.filter_by(airport_parking_id=parking_id).all()
    print(f"Found parking spots: {[spot.to_dict() for spot in parking_spots]}")
    return [spot.to_dict() for spot in parking_spots], 200


#display one parking area by ID
### tested
@airport_area.route("/<int:id>")
# @login_required
def area_by_id(id):
    airport_area = AirportArea.query.get(id)
    print(airport_area)
    if not airport_area:
        return {"message":"Airport Area Couldnt be found"},404
    return airport_area.to_dict(), 200