from flask_wtf import FlaskForm
from wtforms import StringField,DateField,SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import FuelPricing


class FuelPricingForm(FlaskForm):
    type_of_fuel = SelectField("Type of Fuel", choices = [('100ll AvGas', '100ll AvGas'), ('94 unleaded', '94 unleaded'), ('Jet A', 'Jet A'),('100 unleaded', '100 unleaded')])
    fuel_price = StringField("Fuel Price", validators=[DataRequired()])
    date_of_pricing = DateField("Date Of Pricing", validators=[DataRequired()])