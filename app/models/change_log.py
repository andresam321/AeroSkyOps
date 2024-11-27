from .db import db, enviroment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ChangeLog(db.Model):
    __tablename__ = "change_log"

    if enviroment == "production":
        __table_args__ = {'schema':SCHEMA}

id = db.Column(db.Integer, primary_key=True)
login_user = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
target_model = db.Column(db.String, nullable=False)  
target_id = db.Column(db.Integer, nullable=False)    
initials = db.Column(db.String(5), nullable=False)   
change_notes = db.Column(db.String, nullable=False)  
timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)        