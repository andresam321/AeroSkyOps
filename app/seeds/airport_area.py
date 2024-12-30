from app.models import db, environment, SCHEMA, AirportArea
from sqlalchemy.sql import text


def seed_airport_area():
    airport_area = [
        {   
            "id":1,
            "area_name": "North"
            
        },
        {"area_name": "East"},
        {"area_name": "West"},
        {"area_name": "South"}
    ]

    [db.session.add(AirportArea(**airport_parking)) for airport_parking in airport_area]
    db.session.commit()

def undo_airport_area():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.airport_area RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM airport_area"))


    db.session.commit()
