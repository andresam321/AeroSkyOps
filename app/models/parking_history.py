from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class ParkingHistory(db.Model):
    __tablename__ = "parking_histories"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        

    id = db.Column(db.Integer, primary_key=True)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircrafts.id')), nullable=False)
    parking_spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parking_spots.id')), nullable=False) 
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end_time = db.Column(db.DateTime)
    

    aircraft = db.relationship("Aircraft", back_populates="parking_histories")
    parking_spot = db.relationship("ParkingSpot", back_populates="parking_histories")