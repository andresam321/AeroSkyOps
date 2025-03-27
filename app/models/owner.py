from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Owner(db.Model):
    __tablename__ = "owners"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_by_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircrafts.id'), ondelete = "CASCADE"))
    firstname = db.Column(db.String(25), nullable=False)
    lastname = db.Column(db.String(25), nullable=False)
    username = db.Column(db.String(25))
    email = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(40), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    payment_type = db.Column(db.String(40), nullable=False)
    notes = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)



    aircraft = db.relationship("Aircraft", back_populates = "owner")

    created_by = db.relationship("User", foreign_keys=[created_by_user_id], back_populates="created_owners")

    def to_dict(self):

        return {
            'id': self.id,
            'created_by_user_id':self.created_by_user_id,
            'aircraft_id':self.aircraft_id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'address': self.address,
            'phone_number': self.phone_number,
            'payment_type': self.payment_type,
            "notes":self.notes

            
        }