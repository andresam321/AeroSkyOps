from .db import db,environment,SCHEMA,add_prefix_for_prod
from datetime import datetime


class QRCode(db.Model):
    __tablename__ = "qr_code"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    area_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('airport_area.id')), nullable = False)
    qr_code_data = db.Column(db.String(255), nullable = False)
    qr_code_url = db.Column(db.String, nullable=False) 
    created_at = db.Column(db.DateTime, default=datetime.now)


    area = db.relationship("AirportArea", back_populates = "qr_codes")
    fuel_order = db.relationship("FuelOrder", back_populates="qr_code", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id":self.id,
            "area_id":self.area_id,
            "qr_code_data":self.qr_code_data,
            "fuel_orders": [order.to_dict() for order in self.fuel_order],
            "qr_code_url":self.qr_code_url,
        }