from app.models import db, environment, SCHEMA, Aircraft, ParkingHistory
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
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.51.59%E2%80%AFPM.png",
        "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-06+at+4.55.06%E2%80%AFPM.png"
    ]

    manufacturers = ["Boeing", "Airbus", "Cessna", "Gulfstream", "Piper", "Mooney", "Beechcraft", "Bombardier"]
    models = ["737", "A320", "172", "G650", "PA-28", "M20", "King Air 350", "CRJ700"]
    fuel_types = ["Jet A", "100LL AvGas", "94 Unleaded"]
    operation_statuses = ["Operational", "Maintenance", "Decommissioned"]

    aircrafts = []

    for _ in range(1000):  # Generating 1,000 aircraft records
        aircraft = Aircraft(
            user_id=random.randint(1, 10),
            parking_spot_id=random.randint(1, 50),  # Assuming 50 parking spots
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

    # **Step 1: Commit Aircrafts First**
    db.session.bulk_save_objects(aircrafts)
    db.session.commit()  # ✅ Commit aircrafts first so IDs exist

    # **Step 2: Now Create Parking Histories**
    parking_histories = []

    for aircraft in Aircraft.query.all():  # ✅ Retrieve committed aircrafts
        num_entries = random.randint(1, 5)  # Each aircraft gets 1-5 parking history records
        for _ in range(num_entries):
            start_time = datetime.now(timezone.utc) - timedelta(days=random.randint(1, 90))  # Random within last 90 days
            end_time = start_time + timedelta(hours=random.randint(1, 48)) if random.random() > 0.3 else None  # 30% chance of still being parked
            
            parking_histories.append(ParkingHistory(
                aircraft_id=aircraft.id,  # ✅ Now aircraft.id exists
                parking_spot_id=random.randint(1, 50),
                start_time=start_time,
                end_time=end_time
            ))

    # **Step 3: Commit Parking Histories**
    db.session.bulk_save_objects(parking_histories)
    db.session.commit()
    print(f"✅ Seeded {len(parking_histories)} parking history records successfully.")

def undo_aircrafts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircrafts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircrafts"))

    db.session.commit()
