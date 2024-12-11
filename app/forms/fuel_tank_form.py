from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SelectField,FloatField,DateField
from wtforms.validators import DataRequired, Email, ValidationError


class FuelTankForm(FlaskForm):
    tank_name = StringField("Tank Name", validators=[DataRequired()])
    fuel_type = SelectField("Fuel Type", choices=[('100ll AvGas', '100ll AvGas'), ('94 unleaded', '94 unleaded'), ('Jet-A', 'Jet-A'),('100 unleaded', '100 unleaded'),('Diesel', 'Diesel')])
    fuel_capacity = FloatField("Fuel Capacity", validators=[DataRequired()])
    usable_fuel = FloatField("Usable Fuel", validators=[DataRequired()])
    notes = StringField("Notes")
    threshold_level = FloatField("Threshold level", validators=[DataRequired()])
    last_inspection_date = DateField("Last Inspection Date", validators=[DataRequired()])
    next_inspection_due = DateField("Next Inspection due", validators=[DataRequired()])
    maintenance_status = SelectField("Maintenance Status", choices=[('Operational', 'Operational'), ('Under Maintenance', 'Under Maintenance'), ('Awaiting Parts', 'Awaiting Parts'),('Testing', 'Testing'),('Out of Service', 'Out of Service')])
    