from app.models import db, environment, SCHEMA, ParkingHistory
from sqlalchemy.sql import text
from datetime import datetime, timezone


def seed_parking_history ():
    
    parking_histories = [
        # Parked for 3 hours
        {"aircraft_id": 1, "parking_spot_id": 1, "start_time": datetime(2023, 9, 20, 12, 0, 0), 
        "end_time": datetime(2023, 9, 20, 15, 0, 0)},
        # Still parked (no end_time)
        {"aircraft_id": 2, "parking_spot_id": 2, "start_time": datetime(2023, 9, 21, 14, 30, 0), 
        "end_time": None},
        # Parked for 1 day
        {"aircraft_id": 3, "parking_spot_id": 3, "start_time": datetime(2023, 9, 22, 9, 15, 0), 
        "end_time": datetime(2023, 9, 23, 9, 15, 0)},
        # Parked for 12 hours
        {"aircraft_id": 4, "parking_spot_id": 4, "start_time": datetime(2023, 9, 23, 11, 45, 0), 
        "end_time": datetime(2023, 9, 23, 23, 45, 0)},
        # Still parked
        {"aircraft_id": 5, "parking_spot_id": 5, "start_time": datetime(2023, 9, 24, 16, 0, 0), 
        "end_time": None},
        # Parked for 4 hours
        {"aircraft_id": 6, "parking_spot_id": 6, "start_time": datetime(2023, 9, 25, 10, 30, 0), 
        "end_time": datetime(2023, 9, 25, 14, 30, 0)},
        # Parked for 2 days
        {"aircraft_id": 7, "parking_spot_id": 7, "start_time": datetime(2023, 9, 26, 13, 15, 0), 
        "end_time": datetime(2023, 9, 28, 13, 15, 0)},
        # Still parked
        {"aircraft_id": 8, "parking_spot_id": 8, "start_time": datetime(2023, 9, 27, 12, 0, 0), 
        "end_time": None},
        # Parked for 5 hours
        {"aircraft_id": 9, "parking_spot_id": 9, "start_time": datetime(2023, 9, 28, 14, 30, 0), 
        "end_time": datetime(2023, 9, 28, 19, 30, 0)},
        # Parked for 1 hour
        {"aircraft_id": 10, "parking_spot_id": 10, "start_time": datetime(2023, 9, 29, 11, 0, 0), 
        "end_time": datetime(2023, 9, 29, 12, 0, 0)},
    ]
    
    [db.session.add(ParkingHistory(**parking_history)) for parking_history in parking_histories]
    print("Aircrafts seeded successfully.")
    db.session.commit()

def undo_parking_history():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.parking_history RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircrafts"))
    
    db.session.commit()