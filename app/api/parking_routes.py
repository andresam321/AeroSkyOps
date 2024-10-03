from flask import Blueprint, redirect, request
from flask_login import login_required, current_user 
from app.models import db, ParkingSpot, Aircraft
from app.forms import ParkingSpotForm, AircraftForm,UpdateParkingSpotForm
from .aws_helpers import upload_file_to_s3, get_unique_filename



parking_routes = Blueprint('parking_spots', __name__)



# read all spots, list of all parking spots 
@parking_routes.route("/all_spots")
@login_required
def all_spots():
    parkingSpots = ParkingSpot.query.all()
    return {"parkingSpots": [parkingSpot.to_dict() for parkingSpot in parkingSpots]}, 200


@parking_routes.route("/empty")
@login_required
def all_spots_that_are_not_reserved():
    # Adjusting the filter condition to match the string representation of 'is_reserved'
    emptyParkingSpots = ParkingSpot.query.filter_by(is_reserved="No").all()
    return {"parkingSpots": [parkingSpot.to_dict() for parkingSpot in emptyParkingSpots]}, 200


#gets parking spot by id
@parking_routes.route("/<int:id>")
@login_required
def parking_spot_by_id(id):
    parkingSpot = ParkingSpot.query.get(id)
    if not parkingSpot:
        return {"message": "Parking spot couldnt be found"}, 404
    return parkingSpot.to_dict(),200


#creating a parking spot
@parking_routes.route("/new", methods=["POST"])
@login_required
def create_parking_spot():
    print("In create form =>")
    
    form = ParkingSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        try:
            new = ParkingSpot(
                user_id=current_user.id,
                airport_parking_id=int(form.data["airport_parking_id"]),
                spot_number=form.data["spot_number"],
                spot_size=form.data["spot_size"],
                is_reserved=form.data["is_reserved"]
            )
            db.session.add(new)
            db.session.commit()

            added_spot = ParkingSpot.query.filter_by(id=new.id).first()
            if added_spot:
                print("Parking spot added successfully:", added_spot.to_dict())
            else:
                print("Failed to add parking spot.")
            return new.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            # print("Error adding parking spot:", str(e))
            return {"message": "An error occurred while adding the parking spot.", "error": str(e)}, 500
    else:
        # print("Form validation errors:", form.errors)
        return form.errors, 400


#update parking spot
@parking_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_parking_spot(id):
    parkingSpot = ParkingSpot.query.get(id)
    if not parkingSpot:
        return {"message": "Parking Spot couldnt be found"}, 404
    
    form = UpdateParkingSpotForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        parkingSpot.spot_number = form.data['spot_number']
        parkingSpot.spot_size = form.data['spot_size']
        parkingSpot.is_reserved = form.data['is_reserved']

        db.session.commit()
    
        return parkingSpot.to_dict(), 200
    else:
        # print("form errors",form.errors)
        return form.errors, 400


#delete parking spot
@parking_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_parking_spot(id):
    parkingSpot = ParkingSpot.query.get(id)
    aircraft = Aircraft.query.filter_by(parking_spot_id=id).first()

    if not parkingSpot:
        return {"message": "Parking spot couldn't be found"}, 404

    if aircraft:
        return {"message": "Parking spot is assigned to an aircraft and cannot be deleted"}, 400
    else:
        db.session.delete(parkingSpot)
        db.session.commit()

        return {"message": "Successfully deleted parkingSpot"}, 200


#add an aircraft to a parking spot
# @parking_routes.route("/<int:parking_spot_id>/add_plane/<int:aircraft_id>", methods=['POST'])
# @login_required
# def add_aircraft_to_parking(aircraft_id,parking_spot_id):
#         aircraft_with_parking_spot_obj = AircraftWithParkingSpot(
#         aircraft_id=aircraft_id,
#         parking_spot_id=parking_spot_id
#         )

#         db.session.add(aircraft_with_parking_spot_obj)
#         db.session.commit()

#         return {"message": "Plane added to parking spot successfully"}, 201
    

#render parking spots with airplanes
# @parking_routes.route("/with_aircrafts")
# def get_parking_spots_with_aircraft():
#     parking_spots_with_planes = AircraftWithParkingSpot.query.all()
#     return {"parkingSpots": [spot_and_plane.to_dict() for spot_and_plane in parking_spots_with_planes]}, 200


#will display all aircrafts that correspond to specific parking area
@parking_routes.route("/with_aircraft/<int:airport_parking_id>")
@login_required
def get_parking_spots_with_aircraft(airport_parking_id):
    parking_spots = ParkingSpot.query.outerjoin(Aircraft).filter(ParkingSpot.airport_parking_id == airport_parking_id).all()
    return {
        "parkingSpots": [
            {**parking_spot.to_dict(), "aircraft": parking_spot.aircraft.to_dict() if parking_spot.aircraft else None}
            for parking_spot in parking_spots
        ]
    }, 200


# # Edit a parking spot to assign an aircraft
# @parking_routes.route("/<int:parking_spot_id>/edit", methods=['POST'])
# @login_required
# def edit_parking_spot(parking_spot_id):
    
#     parking_spot = ParkingSpot.query.get()
#     if not parking_spot:
#         return {"message": "parkingSpot couldn't be found"}, 404
#     aircraft_id = request.json.get(aircraft_id)

#     aircraft = Aircraft.query.get(aircraft_id)
#     if not aircraft:
#         return {"message": "Parking spot couldnt be found"}, 404
    
#     parking_spot.aircraft_id = aircraft_id
#     parking_spot.is_reserved = "Yes"

#     db.session.commit()

#     return {"message": "Plane added to parking spot successfully"}, 201



#remove plane from parking spot wont delete from db
# @parking_routes.route("/<int:parking_spot_id>/remove_plane/<int:aircraft_id>", methods=['POST'])
# @login_required
# def remove_aircraft_from_parking(parking_spot_id,aircraft_id):

#     aircraft_with_parking_spot = AircraftWithParkingSpot.query.filter_by(parking_spot_id = parking_spot_id, aircraft_id = aircraft_id).first()

#     if not aircraft_with_parking_spot:
#         return {"message": "Association between aircraft and parking spot couldnt be found"},404
    
#     # remove the association
#     db.session.delete(aircraft_with_parking_spot)

#     parking_spot = ParkingSpot.query.get(parking_spot_id)
#     if parking_spot:
#         parking_spot.is_reserved = "No"

#     db.session.commit()

#     return {"message": "Aircraft removed from parking spot successfully"}, 200


#assign aircraft to parking spot 
# @parking_routes.route("/assign_aircraft_to_parking_spot", methods=['POST'])
# @login_required
# def assign_aircraft_to_parking_spot():
#     data = request.get_json()

#     parking_spot_id = data.get('parking_spot_id')
#     aircraft_id = data.get('aircraft_id')

#     if not parking_spot_id or not aircraft_id:
#         return {"error": "Parking spot ID or aircraft ID missing"}, 400

#     parking_spot = ParkingSpot.query.get(parking_spot_id)
#     if not parking_spot:
#         return {"error": "Parking spot not found"}, 404
    
#     aircraft = Aircraft.query.get(aircraft_id)
#     if not aircraft:
#         return {"error": "Aircraft not found"}, 404
    
#     if parking_spot.aircraft_id:
#         return {"error": "Parking spot already occupied"}, 400

#     parking_spot.aircraft_id = aircraft_id
#     db.session.add()
#     db.session.commit()

#     return {"message": "Aircraft assigned to parking spot successfully"}, 201



#current spots with airplanes
@parking_routes.route("/current_spots_with_planes")
@login_required
def current_spots_with_planes():
    pass

#get parking spots with aircraft by area 
@parking_routes.route("/parking_spots_with_aircrafts/<int:area_id>")
@login_required
def get_parking_spots_with_aircraft_by_area(area_id):
    parking_spots = ParkingSpot.query.filter_by(airport_parking_id=area_id).all()
    parking_spots_data = []
    for spot in parking_spots:
        spot_data = spot.to_dict()
        if spot.aircraft:
            spot_data['aircraft'] = spot.aircraft.to_dict()
        else:
            spot_data['aircraft'] = None
        parking_spots_data.append(spot_data)
    return {"parking_spots": parking_spots_data}, 200


#check if parking spots exist
@parking_routes.route("/check_spot", methods = ['POST'])
def check_spot_exist():
    data = request.get_json()
    spot_number = data.get('spot_number')
    airport_parking_id = data.get("airport_parking_id")

    existing_spot = ParkingSpot.query.filter_by(spot_number=spot_number, airport_parking_id=airport_parking_id).first()
    if existing_spot:
        return {"exists": True}, 200
    else:
        return {"exists": False}, 200