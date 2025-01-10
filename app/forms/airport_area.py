from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import AirportArea

class AirportAreaForm(FlaskForm):
    area_name = SelectField("parking name",choices=[('North','North'), ('East','East'), ('West','West'),('South','South')], validators=[DataRequired()])
