from app.models import db, environment, SCHEMA, AircraftFuelLog
from sqlalchemy.sql import text
from datetime import datetime

def seed_aircraft_fuel_log():
    aircraft_fuel_logs = [
        {
            "aircraft_id": 1,
            "amount": 1000.00,
            "created_at": datetime.strptime("2021-06-01 12:00:00", "%Y-%m-%d %H:%M:%S")
        },
        {
            "aircraft_id": 2,
            "amount": 500.00,
            "created_at": datetime.strptime("2021-03-01 12:00:00", "%Y-%m-%d %H:%M:%S")
        },
        {
            "aircraft_id": 3,
            "amount": 200.00,
            "created_at": datetime.strptime("2021-01-01 12:00:00", "%Y-%m-%d %H:%M:%S")
        },
        {
            "aircraft_id": 1,
            "amount": 333.00,
            "created_at": datetime.strptime("2021-04-02 12:00:00", "%Y-%m-%d %H:%M:%S")
        },
        {
            "aircraft_id": 2,
            "amount": 555.00,
            "created_at": datetime.strptime("2021-05-06 12:00:00", "%Y-%m-%d %H:%M:%S")
        },
        {
            "aircraft_id": 3,
            "amount": 111.00,
            "created_at": datetime.strptime("2021-07-06 12:00:00", "%Y-%m-%d %H:%M:%S")
        }
    ]
    [db.session.add(AircraftFuelLog(**fuel_log)) for fuel_log in aircraft_fuel_logs]
    db.session.commit()

def undo_aircraft_fuel_log():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircraft_fuel_log RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircraft_fuel_log"))
    
    db.session.commit()