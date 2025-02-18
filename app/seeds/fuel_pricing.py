from app.models import db, environment, SCHEMA, FuelPricing
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_fuelPricing():
    fuel_pricings = [
    {
        'id': 1,  
        'user_id': 1,  
        'fuel_price': '5.00',
        'type_of_fuel': 'Jet-A',
        'date_of_pricing': datetime(2024, 9, 23, 23, 45, 0)
    },
    {
        'id': 2,
        'user_id': 2,  
        'fuel_price': '4.50',
        'type_of_fuel': 'Jet-A',
        'date_of_pricing': datetime(2024, 9, 23, 23, 45, 0)
    },
    {
        'id': 3,
        'user_id': 3,  
        'fuel_price': '3.75',
        'type_of_fuel': '94 Unleaded',
        'date_of_pricing': datetime(2024, 9, 23, 23, 45, 0)
    },
    {
        'id': 4,
        'user_id': 2,  
        'fuel_price': '4.25',
        'type_of_fuel': '94 Unleaded',
        'date_of_pricing': datetime(2024, 9, 23, 23, 45, 0)
    }
    ]
    

    [db.session.add(FuelPricing(**fuelPricing)) for fuelPricing in fuel_pricings]
    db.session.commit()

def undo_fuelPricing():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fuel_pricing RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fuel_orders"))
