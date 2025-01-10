from app.models import db, environment, SCHEMA, ParkingSpot
from sqlalchemy.sql import text



def seed_parkingSpots():
    spots = [
        {
            "id":1,
            "user_id": 1,
            "airport_area_id":1,
            "spot_number": "A1",
            "spot_size": "Large",
            "is_reserved": "Yes"
        },
        {
            "id":2,
            "user_id": 2,
            "airport_area_id":1,
            "spot_number": "A2",
            "spot_size": "Medium",
            "is_reserved": "Yes"
        },
        {
            "id":3,
            "user_id": 3,
            "airport_area_id":2,
            "spot_number": "B1",
            "spot_size": "Small",
            "is_reserved": "Yes"
        },
        {
            "id":4,
            "user_id": 4,
            "airport_area_id":2,
            "spot_number": "B2",
            "spot_size": "Large",
            "is_reserved": "Yes"
        },
        {
            "id":5,
            "user_id": 4,
            "airport_area_id":3,
            "spot_number": "C1",
            "spot_size": "Medium",
            "is_reserved": "Yes"
        },
        {
            "id":6,
            "user_id": 1,
            "airport_area_id":3,
            "spot_number": "C2",
            "spot_size": "Small",
            "is_reserved": "Yes"
        },
        {
            "id":7,
            "user_id": 2,
            "airport_area_id":4,
            "spot_number": "D1",
            "spot_size": "Large",
            "is_reserved": "Yes"
        },
        {
            "id":8,
            "user_id": 3,
            "airport_area_id":4,
            "spot_number": "D2",
            "spot_size": "Medium",
            "is_reserved": "Yes"
        },
        {
            "id":9,
            "user_id": 4,
            "airport_area_id":1,
            "spot_number": "E1",
            "spot_size": "Small",
            "is_reserved": "Yes"
        },
        {
            "id":10,
            "user_id": 1,
            "airport_area_id":1,
            "spot_number": "E2",
            "spot_size": "Large",
            "is_reserved": "Yes"
        },
        {
            "id":11,
            "user_id": 1,
            "airport_area_id":2,
            "spot_number": "E4",
            "spot_size": "Large",
            "is_reserved": "Yes"
        },
    ]

    [db.session.add(ParkingSpot(**spot)) for spot in spots]
    db.session.commit()

def undo_parkingSpots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.parking_spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM parking_spots"))


    db.session.commit()

