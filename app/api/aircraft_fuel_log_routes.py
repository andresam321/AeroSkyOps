from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, AircraftFuelLog,Aircraft
from datetime import datetime, date

aircraft_fuel_log_routes = Blueprint('aircraft_fuel_logs', __name__)

#display all the fuel logs that correspond to that aircraft ID
#tested
@aircraft_fuel_log_routes.route("/aircrafts/<int:aircraft_id>")
# @login_required
def get_fuel_logs_by_aircraft(aircraft_id):
    fuel_logs = AircraftFuelLog.query.filter_by(aircraft_id=aircraft_id).all()

    if not fuel_logs:
        return jsonify({"message": "No fuel logs found for the specified aircraft"}), 404

    data = [fuel_log.to_dict() for fuel_log in fuel_logs]

    return jsonify({"fuel_logs": data})

## get all fuel logs of the day
#tested
@aircraft_fuel_log_routes.route("/<int:aircraft_id>/daily")
# @login_required
def get_fuel_logs_by_day(aircraft_id):

    today = date.today()
    start_of_day = datetime.combine(today, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())

    fuel_logs = AircraftFuelLog.query.filter(
        AircraftFuelLog.aircraft_id == aircraft_id,
        AircraftFuelLog.created_at  >= start_of_day,
        AircraftFuelLog.created_at  <= end_of_day
    ).all()

    if not fuel_logs:
        return jsonify({"message": "No fuel logs found for the specified aircraft today"}), 404

    data = [fuel_log.to_dict() for fuel_log in fuel_logs]

    return jsonify({"fuel_logs": data})
