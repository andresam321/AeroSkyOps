from .db import db, enviroment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ChangeLog(db.Model):
    __tablename__ = "change_log"

    if enviroment == "production":
        __table_args__ = {'schema':SCHEMA}

id = db.Column(db.Integer, primary_key=True)
login_user = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
        