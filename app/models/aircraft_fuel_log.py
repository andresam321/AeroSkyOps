from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AircraftFuelLogForm(db.Model):
    __tablename__ = "aircraft_fuel_log"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.integer, primary_key=True)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("aircrafts.id")), nullable= False)
    amount = db.Column(db.Decimal(10,2), nullable =False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    aircraft = db.relationship("Aircraft", back_populates="aircraft_fuel_log")

    def to_dict(self):
        return {
            "id":self.id,
            "aircraft_id":self.aircraft_id,
            "amount":self.amount,
            "created_at":self.created_at,
            "updated_at":self.updated_at
        }