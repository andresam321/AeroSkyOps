from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class FuelOrder(db.Model):
    __tablename__ = "fuel_orders"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircrafts.id')), nullable = False)
    completed_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    created_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    parking_spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parking_spots.id')), nullable=False)
    fuel_type = db.Column(db.String(25), nullable = False)
    request_by = db.Column(db.String(25), nullable = False)
    positive_prist = db.Column(db.String(10), nullable = False)
    quantity = db.Column(db.String(255), nullable = False)
    paid = db.Column(db.String(55), nullable = False)
    service_date_deadline_by = db.Column(db.String(25), nullable=False)
    service_time_deadline_by = db.Column(db.String(25), nullable=False)  
    is_completed = db.Column(db.String(25), nullable=False) 
    order_date = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    aircraft = db.relationship("Aircraft", back_populates = "fuel_order")
    completed_by = db.relationship("User", foreign_keys=[completed_by_user_id], back_populates="completed_fuel_orders")
    created_by = db.relationship("User", foreign_keys=[created_by_user_id], back_populates="created_fuel_orders")
    parking_spot = db.relationship("ParkingSpot", back_populates="fuel_orders")

    def to_dict(self):

        return {
            'id': self.id,
            'completed_by_user_id': self.completed_by_user_id,
            'created_by_user_id':self.created_by_user_id,
            'aircraft_id':self.aircraft_id,
            'parking_spot_id':self.parking_spot_id,
            'fuel_type':self.fuel_type,
            'request_by':self.request_by,
            'positive_prist':self.positive_prist,
            'quantity':self.quantity,
            'paid':self.paid,
            'service_date_deadline_by': self.service_date_deadline_by,
            'service_time_deadline_by': self.service_time_deadline_by,
            'is_completed': self.is_completed,
            'order_date':self.order_date,
            'parking_spot_spot_number': self.parking_spot.spot_number if self.parking_spot else None,  # Lazy loaded spot_number info
            'aircraft_tail_number': self.aircraft.tail_number if self.aircraft else None,  # Lazy loaded aircraft info
            'aircraft_model': self.aircraft.model if self.aircraft else None,  # Lazy loaded aircraft model
            'aircraft_parking_spot_id': self.aircraft.parking_spot_id if self.aircraft else None  
        }
