from .db import db, environment,SCHEMA,add_prefix_for_prod


class FuelTank(db.Model):
    __tablename__ = 'fuel_tank'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    tank_name = db.Column(db.String, nullable=False)
    fuel_type = db.Column(db.String, nullable=False)
    current_fuel_level = db.Column(db.Float, nullable=False)
    fuel_capactiy = db.Column(db.Float, nullable=False)
    usable_fuel = db.Column(db.Float, nullable=False)
    threshold_level = db.Column(db.Float, nullable=False)
    last_inspection_date = db.Column(db.DateTime, nullable=False)
    nex_inspection_due = db.Column(db.DateTime, nullable=False)
    maintenance_status = db.Column(db.String, nullable=False)
