from app.models import db, environment, SCHEMA, Aircraft, ParkingHistory, ParkingSpot
from sqlalchemy.sql import text
from datetime import datetime, timezone, timedelta
import random
import string
from faker import Faker

def generate_tail_number():
    """Generate a random FAA-style tail number starting with 'N'."""
    return f"N{random.randint(1, 9)}{random.choice(string.ascii_uppercase)}{random.randint(100, 999)}"

fake = Faker()

def seed_aircrafts():
    plane_urls = [
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-04-25+at+7.07.18%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.42.40%E2%80%AFPM.png",
    ]

    manufacturers = ["Boeing", "Airbus", "Cessna", "Gulfstream", "Piper", "Mooney", "Beechcraft", "Bombardier"]
    models = ["737", "A320", "172", "G650", "PA-28", "M20", "King Air 350", "CRJ700"]
    fuel_types = ["Jet A", "100LL AvGas", "94 Unleaded"]
    operation_statuses = ["Operational", "Maintenance", "Decommissioned"]

    # **Ensure Parking Spots Exist**
    parking_spot_ids = [spot.id for spot in db.session.query(ParkingSpot.id).all()]
    if not parking_spot_ids:
        print("⚠️ No parking spots found. Run `seed_parkingSpots()` first!")
        return

    used_spots = set()  # **Track assigned spots**
    aircrafts = []

    for _ in range(min(len(parking_spot_ids), 60)):  # Limit to available spots
        available_spots = list(set(parking_spot_ids) - used_spots)
        if not available_spots:
            print("🚨 No more available parking spots!")
            break  # **Avoid duplicate assignments**

        parking_spot_id = random.choice(available_spots)
        used_spots.add(parking_spot_id)  # ✅ Mark as used

        aircraft = Aircraft(
            user_id=random.randint(1, 4),
            parking_spot_id=parking_spot_id,  # **Ensure 1:1 assignment**
            plane_image=random.choice(plane_urls),
            tail_number=generate_tail_number(),
            manufacturer=random.choice(manufacturers),
            model=random.choice(models),
            max_takeoff_weight=str(random.randint(500, 100000)),
            seating_capacity=str(random.randint(2, 400)),
            operation_status=random.choice(operation_statuses),
            fuel_type=random.choice(fuel_types),
            active_owners=str(random.randint(1, 5)),
            notes=fake.sentence(),
            last_time_fueled=datetime.now(timezone.utc),
        )
        aircrafts.append(aircraft)

    db.session.bulk_save_objects(aircrafts)
    db.session.commit()
    print(f"✅ Seeded {len(aircrafts)} aircrafts successfully.")

    # **Step 3: Now Create Parking Histories**
    batch_size = 10
    parking_histories = []

    for aircraft in Aircraft.query.all():  # ✅ Retrieve committed aircrafts
        num_entries = random.randint(1, 3)  # Each aircraft gets 1-3 parking history records
        for _ in range(num_entries):
            start_time = datetime.now(timezone.utc) - timedelta(days=random.randint(1, 90))  # Within last 90 days
            end_time = start_time + timedelta(hours=random.randint(1, 48)) if random.random() > 0.3 else None  # 30% chance of still being parked
            
            parking_histories.append(ParkingHistory(
                aircraft_id=aircraft.id,  # ✅ Now aircraft.id exists
                parking_spot_id=aircraft.parking_spot_id,  # ✅ Match assigned parking
                start_time=start_time,
                end_time=None
            ))

    for i in range(0, len(parking_histories), batch_size):
        db.session.bulk_save_objects(parking_histories[i:i+batch_size])
        db.session.commit()
        print(f"✅ Seeded {i + batch_size} parking history records successfully.")


def undo_aircrafts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircrafts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircrafts"))

    db.session.commit()
