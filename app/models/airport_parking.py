from .db import db, environment, SCHEMA, add_prefix_for_prod

class AirportParking(db.Model):
    __tablename__ = "airport_parkings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    parking_name = db.Column(db.String(20), nullable=False, unique=True)  # "North", "East", "West", "South"

    parking_spots = db.relationship("ParkingSpot", back_populates="airport_parking", cascade='all, delete-orphan')

    # one to many for parking history
    parking_histories = db.relationship("ParkingHistory", back_populates="parking_spot", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "parking_name": self.parking_name,
            #this will render all parking spots related
            "parking_spots": [spot.to_dict() for spot in self.parking_spots]
            
        }