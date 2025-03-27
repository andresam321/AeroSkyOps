from app.models import db, environment, SCHEMA, ParkingSpot
from sqlalchemy.sql import text


def seed_parkingSpots():
    spots = []
    areas = {
        "N": 1,
        "E": 2,
        "W": 3,
        "S": 4
    }

    spot_sizes = ["Small", "Medium", "Large"]
    user_ids = [1, 2, 3, 4]  # Rotating user assignments

    spot_number = 1
    for area_name, area_id in areas.items():
        for i in range(1, 13):  # 12 spots per area
            spot = {
                "id": spot_number,
                "user_id": user_ids[i % len(user_ids)],  # Rotate user IDs
                "airport_area_id": area_id,
                "spot_number": f"{area_name}{i}",
                "spot_size": spot_sizes[i % len(spot_sizes)],  # Rotate sizes
                "is_reserved": "Yes"
            }
            spots.append(spot)
            spot_number += 1  # Increment spot ID

    # Add spots to the database
    [db.session.add(ParkingSpot(**spot)) for spot in spots]
    db.session.commit()


def undo_parkingSpots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.parking_spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM parking_spots"))

    db.session.commit()
