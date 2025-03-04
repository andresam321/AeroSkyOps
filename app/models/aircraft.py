from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Aircraft(db.Model):
    __tablename__ = "aircrafts"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    parking_spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parking_spots.id'),ondelete="SET NULL"))
    plane_image = db.Column(db.String,nullable = False)
    tail_number = db.Column(db.String(10), nullable = False)
    manufacturer = db.Column(db.String(255))
    model = db.Column(db.String(255))
    max_takeoff_weight = db.Column(db.String(50))
    seating_capacity = db.Column(db.String(50))
    operation_status = db.Column(db.String(50), nullable = False)
    fuel_type = db.Column(db.String(50), nullable = False)
    active_owners = db.Column(db.String(10),nullable = False)
    notes = db.Column(db.String(255))
    last_time_fueled = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    #many to one 
    employee = db.relationship('User', back_populates ='aircrafts')

    #one to one 
    parking_spot = db.relationship("ParkingSpot",back_populates = "aircraft",single_parent=True,uselist=False)

    #one to many
    owner = db.relationship("Owner", back_populates = "aircraft")

    #one to many
    fuel_order = db.relationship("FuelOrder", back_populates = "aircraft",cascade='all, delete-orphan')
    
    aircraft_fuel_log = db.relationship("AircraftFuelLog", back_populates="aircraft", cascade="all, delete-orphan")
    #one to many

    parking_histories = db.relationship("ParkingHistory", back_populates ="aircraft",cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "parking_spot_id":self.parking_spot_id,
            "plane_image":self.plane_image,
            "tail_number":self.tail_number,
            "manufacturer":self.manufacturer,
            "model":self.model,
            "max_takeoff_weight":self.max_takeoff_weight,
            "seating_capacity":self.seating_capacity,
            "operation_status":self.operation_status,
            "fuel_type":self.fuel_type,
            "active_owners":self.active_owners,
            "notes":self.notes,
            "last_time_fueled":self.last_time_fueled
        }
    
