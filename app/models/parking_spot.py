from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ParkingSpot(db.Model):
    __tablename__ = "parking_spots"

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    airport_parking_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('airport_parkings.id')), nullable=False)
    spot_number = db.Column(db.String(50), nullable = False)
    spot_size = db.Column(db.String(50),nullable = False)
    is_reserved = db.Column(db.String(10), nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)



    #one to many 
    employee = db.relationship('User', back_populates ='parking_spots')

    airport_parking = db.relationship("AirportParking", back_populates = 'parking_spots')

    fuel_orders = db.relationship("FuelOrder", back_populates="parking_spot")

    #one to one 
    aircraft = db.relationship('Aircraft', back_populates = 'parking_spot', uselist=False,single_parent=True)
    
    # one to many for parking history
    parking_histories = db.relationship("ParkingHistory", back_populates="parking_spot")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "airport_parking_id": self.airport_parking_id,
            "spot_number": self.spot_number,
            "spot_size": self.spot_size,
            "is_reserved": self.is_reserved
        }

