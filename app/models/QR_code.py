from .db import db,environment,SCHEMA,add_prefix_for_prod
from datetime import datetime


class QRCode(db.Model):
    __tablename__ = "qr_codes"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    area_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('areas.id')), nullable = False)
    qr_code_data = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)


    area = db.relationship("AirportArea", back_populates = "qr_codes")

    def to_dict(self):
        return {
            "id":self.id,
            "parking_spot_id":self.parking_spot_id,
            "qr_code_data":self.qr_code_data
        }