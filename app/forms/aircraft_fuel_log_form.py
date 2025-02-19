from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class AircraftFuelLogForm(FlaskForm):
    amount = IntegerField("Amount", validators=[DataRequired()])

