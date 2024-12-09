from .db import db, environment,SCHEMA,add_prefix_for_prod


class FuelTank(db.Model):
    __tablename__ = 'fuel_tank'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    created_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    tank_name = db.Column(db.String, nullable=False)
    fuel_type = db.Column(db.String, nullable=False)
    fuel_capacity = db.Column(db.Float, nullable=False)
    usable_fuel = db.Column(db.Float, nullable=False)
    threshold_level = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String, nullable=False)
    last_inspection_date = db.Column(db.Date, nullable=False)
    next_inspection_due = db.Column(db.Date, nullable=False)
    maintenance_status = db.Column(db.String(50), nullable=False)
    



    def to_dict(self):
        return {
            "id":self.id,
            'created_by_user_id':self.created_by_user_id,
            "tank_name":self.tank_name,
            "fuel_type":self.fuel_type,
            "fuel_capacity":self.fuel_capacity,
            "usable_fuel":self.usable_fuel,
            "threshold_level":self.threshold_level,
            "notes":self.notes,
            "last_inspection_date": self.last_inspection_date.isoformat(),
            "next_inspection_due": self.next_inspection_due.isoformat(),
            "maintenance_status":self.maintenance_status        

    }