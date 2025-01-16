from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import ParkingSpot,AirportArea



# def check_spot(form, field):
#     spot_number = field.data
#     airport_parking_id = form.airport_area_id.data
#     parkingSpot = ParkingSpot.query.filter(ParkingSpot.spot_number == spot_number).first()
#     if parkingSpot:
#         raise ValidationError("Spot number already in use")
#     if not spot_number.startswith(get_prefix(airport_parking_id)):
#         raise ValidationError(f"Spot number must start with '{get_prefix(airport_parking_id)}' for the selected parking area")

def get_prefix(parking_area_id):
    prefixes = {
        '1': 'N',  # North
        '2': 'E',  # East
        '3': 'W',  # West
        '4': 'S'   # South
    }
    return prefixes.get(parking_area_id, '')

class ParkingSpotForm(FlaskForm):
    airport_area_id = SelectField("Airport Parking ID", choices=[], validators=[DataRequired()])
    spot_number = StringField("Spot Number", validators=[DataRequired()])
    spot_size = SelectField("Spot Size", choices=[('Small','Small'), ('Medium','Medium'), ('Large','Large')], validators=[DataRequired()])
    is_reserved = SelectField("Is Reserved", choices=[('Yes','Yes'), ('No','No')], validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        super(ParkingSpotForm, self).__init__(*args, **kwargs)
        from ..models import AirportArea  # Import model to avoid circular imports

        try:
            self.airport_area_id.choices = [("", "Select a Parking Area")] + [
                (str(area.id), area.area_name) for area in AirportArea.query.all()
            ]
        except Exception as e:
            print("Error populating airport areas:", e)
            self.airport_area_id.choices = [("", "No areas available")]
            
class UpdateParkingSpotForm(FlaskForm):
    spot_number = StringField("Spot Number", validators=[DataRequired()])
    spot_size = SelectField("Spot Size", choices=[('Small','Small'), ('Medium','Medium'), ('Large','Large')], validators=[DataRequired()])
    is_reserved = SelectField("Is Reserved", choices=[('Yes','Yes'), ('No','No')], validators=[DataRequired()])
