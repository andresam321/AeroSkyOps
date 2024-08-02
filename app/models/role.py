from .db import db, environment, SCHEMA
from datetime import datetime


class Role(db.Model):
    __tablename__ = "role"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", back_populates="role")

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
        }

    def employees(self):
        return {
            "id": self.id,
            "role": self.role,
            "users": self.users,
        }
