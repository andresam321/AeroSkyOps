from app.models import db, environment, SCHEMA, Aircraft, ParkingHistory
from sqlalchemy.sql import text
from datetime import datetime, timezone



def seed_aircrafts():
    
    plane_urls = [
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-04-25+at+7.07.18%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.42.40%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.51.59%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-06+at+4.55.06%E2%80%AFPM.png"
    ]

    aircrafts = [
        {
            "user_id": 1,
            "parking_spot_id":11,
            "plane_image": plane_urls[0],
            "tail_number": "A1-12345",
            "manufacturer": "Boeing",
            "model": "737",
            "max_takeoff_weight": "80000",
            "seating_capacity": "180",
            "operation_status": "Operational",
            "fuel_type": "Jet A",
            "active_owners": "3",
            "notes": "Recently serviced and ready for flight.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "parking_spot_id":2,
            "plane_image": plane_urls[1],
            "tail_number": "B2-67890",
            "manufacturer": "Airbus",
            "model": "A320",
            "max_takeoff_weight": "75000",
            "seating_capacity": "160",
            "operation_status": "Maintenance",
            "fuel_type": "100ll AvGas",
            "active_owners": "2",
            "notes": "Undergoing routine maintenance.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 3,
            "parking_spot_id":3,
            "plane_image": plane_urls[2],
            "tail_number": "C3-54321",
            "manufacturer": "Cessna",
            "model": "172",
            "max_takeoff_weight": "1100",
            "seating_capacity": "4",
            "operation_status": "Operational",
            "fuel_type": "94 unleaded",
            "active_owners": "1",
            "notes": "Used for training flights.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 4,
            "parking_spot_id":4,
            "plane_image": plane_urls[3],
            "tail_number": "D4-98765",
            "manufacturer": "Gulfstream",
            "model": "G650",
            "max_takeoff_weight": "99000",
            "seating_capacity": "18",
            "operation_status": "Decommissioned",
            "fuel_type": "Jet A",
            "active_owners": "1",
            "notes": "No longer in service.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 1,
            "parking_spot_id":5,
            "plane_image": plane_urls[4],
            "tail_number": "E5-11223",
            "manufacturer": "Bombardier",
            "model": "CRJ700",
            "max_takeoff_weight": "67000",
            "seating_capacity": "78",
            "operation_status": "Operational",
            "fuel_type": "100ll AvGas",
            "active_owners": "2",
            "notes": "Used for regional flights.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "parking_spot_id":6,
            "plane_image": plane_urls[5],
            "tail_number": "F6-33445",
            "manufacturer": "Embraer",
            "model": "E190",
            "max_takeoff_weight": "57000",
            "seating_capacity": "100",
            "operation_status": "Operational",
            "fuel_type": "94 unleaded",
            "active_owners": "1",
            "notes": "Currently on standby.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 3,
            "parking_spot_id":7,
            "plane_image": plane_urls[0],
            "tail_number": "G7-55667",
            "manufacturer": "Dassault",
            "model": "Falcon 7X",
            "max_takeoff_weight": "70000",
            "seating_capacity": "14",
            "operation_status": "Maintenance",
            "fuel_type": "Jet A",
            "active_owners": "3",
            "notes": "Scheduled for avionics upgrade.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 4,
            "parking_spot_id":8,
            "plane_image": plane_urls[1],
            "tail_number": "H8-77889",
            "manufacturer": "Piper",
            "model": "PA-28",
            "max_takeoff_weight": "2400",
            "seating_capacity": "4",
            "operation_status": "Operational",
            "fuel_type": "100 unleaded",
            "active_owners": "1",
            "notes": "Perfect condition for private use.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 1,
            "parking_spot_id":9,
            "plane_image": plane_urls[2],
            "tail_number": "I9-99001",
            "manufacturer": "Beechcraft",
            "model": "King Air 350",
            "max_takeoff_weight": "15000",
            "seating_capacity": "11",
            "operation_status": "Operational",
            "fuel_type": "Jet A",
            "active_owners": "2",
            "notes": "Ideal for business travel.",
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "parking_spot_id":10,
            "plane_image": plane_urls[3],
            "tail_number": "J0-12312",
            "manufacturer": "Mooney",
            "model": "M20",
            "max_takeoff_weight": "3000",
            "seating_capacity": "4",
            "operation_status": "Operational",
            "fuel_type": "100ll AvGas",
            "active_owners": "1",
            "notes": "Recently overhauled engine.",
            "last_time_fueled": datetime.now(timezone.utc),
        }
    ]

    for aircraft_data in aircrafts:
        # Create and add the aircraft
        aircraft = Aircraft(**aircraft_data)
        db.session.add(aircraft)
        db.session.commit()  # Commit the aircraft to get the ID

        # Automatically create ParkingHistory if the aircraft has a parking_spot_id
        if aircraft.parking_spot_id:
            parking_history = ParkingHistory(
                aircraft_id=aircraft.id,
                parking_spot_id=aircraft.parking_spot_id,
                start_time=datetime.now(timezone.utc),
                end_time=None  # Active parking history
            )
            db.session.add(parking_history)

    db.session.commit() 

def undo_aircrafts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircrafts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircrafts"))
    
    db.session.commit()