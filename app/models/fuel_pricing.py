from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class FuelPricing(db.Model):
    __tablename__ = "fuel_pricing"
    
    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
        

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    fuel_price = db.Column(db.String(25))
    type_of_fuel = db.Column(db.String(25))
    


    user = db.relationship("User", back_populates = "fuel_pricing")   


    def to_dict(self):
        
        return{
            'id':self.id,
            'user_id': self.user_id,
            'fuel_price':self.fuel_price,
            'type_of_fuel':self.type_of_fuel            

        }
        

