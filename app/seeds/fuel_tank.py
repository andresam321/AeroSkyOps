from app.models import db, environment, SCHEMA, FuelTank, ParkingHistory
from sqlalchemy.sql import text
from datetime import date, timezone



def seed_fuel_tank():
    fuel_tanks = [
        {
            "created_by_user_id": 1,
            "tank_name": "Tank 1",
            "fuel_type": "Avgas 100LL",
            "fuel_capacity": 10000.0,
            "usable_fuel":5000.0,
            "threshold_level": 2000.0,  # Example threshold for notification (20%)
            "notes":"Dirty Tank needs to be clean asap",
            "last_inspection_date": date(2024, 1, 15), 
            "next_inspection_due": date(2024, 6, 15),  
            "maintenance_status": "operational"
        },
        {
            "created_by_user_id": 1,
            "tank_name": "Tank 2",
            "fuel_type": "Jet-A",  
            "fuel_capacity": 10000.0,
            "usable_fuel":9000.0,
            "threshold_level": 2000.0,  # Example threshold for notification (20%)
            "notes":"Dirty Tank needs to be clean asap",
            "last_inspection_date": date(2024, 2, 10), 
            "next_inspection_due": date(2024, 7, 10),  
            "maintenance_status": "operational"
        },
        {
            "created_by_user_id": 1,
            "tank_name": "Tank 3",
            "fuel_type": "Unleaded 94", 
            "fuel_capacity": 10000.0,
            "usable_fuel":2000.0,
            "threshold_level": 2000.0,  # Example threshold for notification (20%)
            "notes":"Dirty Tank needs to be clean asap",
            "last_inspection_date": date(2024, 3, 5), 
            "next_inspection_due": date(2024, 8, 5),  
            "maintenance_status": "operational"
        }

    ]
    [db.session.add(FuelTank(**fuel_tank)) for fuel_tank in fuel_tanks]
    db.session.commit()
    

def undo_fuel_tank():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fuel_tank RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM owners"))

    db.session.commit()