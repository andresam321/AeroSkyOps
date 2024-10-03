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
    

    def to_dict(self):
        return {
        "id":self.id,
        "aircraft_id":self.aircraft_id,
        "parking_spot_id":self.parking_spot_id,
        "start_time":self.start_time,
        "end_time":self.end_time,
        "aircraft": {
                "id": self.aircraft.id,
                "tail_number": self.aircraft.tail_number,
                "manufacturer": self.aircraft.manufacturer,
                "model": self.aircraft.model,
                "operation_status": self.aircraft.operation_status,
                
            }        
    }