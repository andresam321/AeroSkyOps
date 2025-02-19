from app.models import db, environment, SCHEMA, AircraftFuelLog
from sqlalchemy.sql import text

def seed_aircraft_fuel_log():
    aircraft_fuel_log = [
        {
            "aircraft_id": 1,
            "amount": 1000.00
        },
        {
            "aircraft_id": 2,
            "amount": 500.00
        },
        {
            "aircraft_id": 3,
            "amount": 200.00
        },
        {
            "aircraft_id": 1,
            "amount": 333.00
        },
        {
            "aircraft_id": 2,
            "amount": 555.00
        },
        {
            "aircraft_id": 3,
            "amount": 111.00
        }
    ]

    [db.session.add(AircraftFuelLog(**fuel_log)) for fuel_log in aircraft_fuel_log]
    db.session.commit()

def undo_aircraft_fuel_log():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircraft_fuel_log RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircraft_fuel_log"))
    
    db.session.commit()