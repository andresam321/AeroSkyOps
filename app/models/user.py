from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import uuid


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(
        db.String(55), unique=True, default=lambda: str(uuid.uuid4())
    )
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('role.id')), nullable=False)

    parking_spots = db.relationship(
        "ParkingSpot", back_populates="employee", cascade="all, delete-orphan"
    )

    aircrafts = db.relationship(
        "Aircraft", back_populates="employee", cascade="all, delete-orphan"
    )

    completed_fuel_orders = db.relationship(
        "FuelOrder",
        foreign_keys="FuelOrder.completed_by_user_id",
        back_populates="completed_by",
        cascade="all, delete-orphan",
    )

    created_fuel_orders = db.relationship(
        "FuelOrder",
        foreign_keys="FuelOrder.created_by_user_id",
        back_populates="created_by",
        cascade="all, delete-orphan",
    )

    created_owners = db.relationship(
        "Owner",
        foreign_keys="Owner.created_by_user_id",
        back_populates="created_by",
        cascade="all, delete-orphan",
    )

    role = db.relationship("Role", back_populates="users")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.employee_id:
            self.employee_id = str(uuid.uuid4())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            # 'username': self.username,
            "email": self.email,
            "role": self.role,
        }
