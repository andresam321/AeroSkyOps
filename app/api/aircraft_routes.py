from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from app.models import db, Aircraft, ParkingSpot, ParkingHistory
from app.forms import AircraftForm, ParkingSpotForm
from .aws_helpers import upload_file_to_s3, get_unique_filename
from datetime import datetime

aircraft_routes = Blueprint('aircrafts', __name__)



#display all aircraft 
@aircraft_routes.route("/all")
@login_required
def all_aircrafts():
    aircrafts = Aircraft.query.all()
    return {"aircrafts": [aircraft.to_dict() for aircraft in aircrafts]}, 200

#display one aircraft by ID
@aircraft_routes.route("/<int:id>")
@login_required
def aircraft_by_id(id):
    aircraft = Aircraft.query.get(id)
    if not aircraft:
        return {"message":"Aircraft  couldnt be found"},404
    return aircraft.to_dict(),200


#get one aircraft that displays parking spot and all the owners

@aircraft_routes.route("/<int:id>/aircraft/with_owners/parking_spot")
@login_required
def aircraft_with_owners_parking_spot(id):
   
    pass


#creating airplane 
@aircraft_routes.route("/new", methods=["POST"])
@login_required
def create_aircraft():
    print("In create form =>")

    form = AircraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    plane_image = form.data["plane_image"]
    url = None

    if plane_image:
        plane_image.filename = get_unique_filename(plane_image.filename)
        upload = upload_file_to_s3(plane_image)
        if "url" not in upload:
            return {"error": "Image upload failed. Please try again."}, 500
        url = upload["url"]
    
    if form.validate_on_submit():
        last_time_fueled_str = form.data['last_time_fueled']
        last_time_fueled_dt = datetime.strptime(last_time_fueled_str, '%Y-%m-%d')

        params = {
            "user_id":current_user.id,
            "plane_image":url,
            "tail_number":form.data['tail_number'],
            "manufacturer":form.data['manufacturer'],
            "model":form.data['model'],
            "max_takeoff_weight":form.data['max_takeoff_weight'],
            "seating_capacity":form.data['seating_capacity'],
            "operation_status":form.data['operation_status'],
            "fuel_type":form.data['fuel_type'],
            "active_owners":form.data['active_owners'],
            "notes":form.data['notes'],
            "last_time_fueled":form.data['last_time_fueled']
        }

        new_aircraft = Aircraft(**params)

        db.session.add(new_aircraft)
        db.session.commit()

        return new_aircraft.to_dict(), 201
    else:
        # print(form.errors)
        return form.errors, 400

#update aircraft by id
#update parking spot
@aircraft_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_parking_spot(id):
    aircraft = Aircraft.query.get(id)
    if not aircraft:
        return {"message": "Parking Spot couldn't be found"}, 404
    
    form = AircraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        plane_image = form.data["plane_image"]
        url = None

        if plane_image:
            plane_image.filename = get_unique_filename(plane_image.filename)
            upload = upload_file_to_s3(plane_image)
            if "url" not in upload:
                return {"error": "Image upload failed. Please try again."}, 500
            url = upload["url"]

        aircraft.plane_image = url if url else aircraft.plane_image
        aircraft.tail_number = form.data['tail_number']
        aircraft.manufacturer = form.data['manufacturer']
        aircraft.model = form.data['model']
        aircraft.max_takeoff_weight = form.data['max_takeoff_weight']
        aircraft.seating_capacity = form.data['seating_capacity']
        aircraft.operation_status = form.data['operation_status']
        aircraft.fuel_type = form.data['fuel_type']
        aircraft.active_owners = form.data['active_owners']
        aircraft.notes = form.data['notes']
        aircraft.last_time_fueled = form.data['last_time_fueled']

        db.session.commit()
        return aircraft.to_dict(), 200
    else:
        return form.errors, 400


#delete plane by id
@aircraft_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_parking_spot(id):
    aircraft = Aircraft.query.get(id)

    if not aircraft:
        return {"message": "aircraft couldn't be found"}, 404
    
    if aircraft.parking_spot:
        return {"message": "Aircraft is parked at a parking spot and cannot be deleted"}, 400


    db.session.delete(aircraft)
    db.session.commit()

    return {"message": "Successfully deleted aircraft"}, 200


#creating an airplane if not assigned
# @aircraft_routes.route('/available', methods=['POST'])
# @login_required
# def add_available_aircraft():
#     available_aircraft = Aircraft.query.filter_by(is_assigned="No").all()

#     if not available_aircraft:
#         return {"message": "No available aircraft found"}, 200
    
#     for aircraft in available_aircraft:
#         db.session.add(aircraft)
#     db.session.commit()

#     return {"aircraft": [aircraft.to_dict() for aircraft in available_aircraft]}, 200

# #grabgging an airccraft thats not a assign
# @aircraft_routes.route('/assigned', methods=['GET'])
# @login_required
# def adding_not_assign_aircraft():
#     available_aircraft = Aircraft.query.filter_by(is_assigned="No").all()

#     if not available_aircraft:
#         return {"message": "No available aircraft found"}, 200
    
#     return {"aircraft": [aircraft.to_dict() for aircraft in available_aircraft]}, 200


#assigning aircraft to parking spot
@aircraft_routes.route("/assign_aircraft_to_parking_spot", methods=["POST"])
@login_required
def assign_aircraft_to_parking():
    aircraft_id = request.json.get('aircraft_id')
    spot_id = request.json.get('parking_spot_id')

    print(f"Received aircraft_id: {aircraft_id}, spot_id: {spot_id}")

    aircraft = Aircraft.query.get(aircraft_id)
    parking_spot = ParkingSpot.query.get(spot_id)

    if not aircraft:
        print(f"Aircraft with id {aircraft_id} not found")
    if not parking_spot:
        print(f"Parking Spot with id {spot_id} not found")

    if not aircraft or not parking_spot:
        return {"errors": "Aircraft or Parking Spot not found"}, 404

    if parking_spot.aircraft is not None:
        return {"errors": "Parking Spot already occupied"}, 400

    aircraft.parking_spot_id = spot_id  
    db.session.commit()
    
    new_parking_history = ParkingHistory(
        aircraft_id=aircraft_id,
        parking_spot_id=spot_id,
        start_time=datetime.now()  
    )

    db.session.add(new_parking_history)
    db.session.commit()

    # print(f"Aircraft {aircraft.id} assigned to Parking Spot {aircraft.parking_spot_id}")
    return {"message": "Aircraft assigned to parking spot successfully", "aircraft": aircraft.to_dict()}, 200


#unassign aircraft from parking spots
@aircraft_routes.route("/unassign_aircraft_from_parking_spot", methods=["POST"])
@login_required
def unassign_aircraft_from_parking():
    # if current_user.role != "manager":
    #     return {"errors": "Forbidden"}, 403
    print(current_user)
    
    aircraft_id = request.json.get('aircraft_id')

    aircraft = Aircraft.query.get(aircraft_id)
    if not aircraft:
        return {"errors": "Aircraft not found"}, 404
    
    active_parking_history = ParkingHistory.query.filter_by(aircraft_id=aircraft_id, end_time=None).first()
    
    if not active_parking_history:
        return {"errors": "No active parking record found for this aircraft"}, 404
    
    active_parking_history.end_time = datetime.now()

    aircraft.parking_spot_id = None  
    db.session.commit()

    return {"message": "Aircraft unassigned from parking spot successfully", "aircraft": aircraft.to_dict(),
            "parking_history":active_parking_history.to_dict()}, 200


#assigned_aircrafts
# @aircraft_routes.route("/assigned_aircrafts")
# @login_required
# def get_assigned_aircrafts():
#     assigned_aircrafts = Aircraft.query.filter(Aircraft.parking_spot_id.isnot(None)).all()
#     return {"assigned_aircrafts": [aircraft.to_dict() for aircraft in assigned_aircrafts]}, 200


@aircraft_routes.route("/all_aircrafts_with_parking_spots")
@login_required
def all_aircrafts_with_parking_spots():
    try:
        # Fetch all aircrafts with their associated parking spots
        aircrafts = Aircraft.query.all()

        
        aircrafts_with_spots = []
        for aircraft in aircrafts:
            aircraft_dict = aircraft.to_dict()
            if aircraft.parking_spot:
                parking_spot_dict = aircraft.parking_spot.to_dict()
            else:
                parking_spot_dict = None
            aircraft_dict['parking_spot'] = parking_spot_dict
            aircrafts_with_spots.append(aircraft_dict)

        return aircrafts_with_spots, 200

    except Exception as e:
        return {"error": str(e)}, 500