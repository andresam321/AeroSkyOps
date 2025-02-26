from .db import db, environment, SCHEMA, add_prefix_for_prod

class AirportArea(db.Model):
    __tablename__ = "airport_area"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    area_name = db.Column(db.String(20), nullable=False, unique=True) 
 
    parking_spots = db.relationship("ParkingSpot", back_populates="airport_parking", cascade='all, delete-orphan')

    qr_codes = db.relationship("QRCode", back_populates="area",uselist=False, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "area_name": self.area_name,
            #this will render all parking spots related
            "parking_spots": [spot.to_dict() for spot in self.parking_spots]    
        }