from flask_wtf import FlaskForm
from wtforms import StringField,DateField
from wtforms.validators import DataRequired
from app.models import ParkingHistory


class ParkingHistoryForm(FlaskForm):
    start_time = DateField("Start Time", validators=[DataRequired()])
    end_time = DateField("End Time", validators=[DataRequired()])