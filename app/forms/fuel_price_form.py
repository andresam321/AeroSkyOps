from flask_wtf import FlaskForm
from wtforms import StringField,DateField,SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import FuelPricing


class FuelPricingForm(FlaskForm):
    type_of_fuel = SelectField("Type of Fuel", choices = [('100LL AvGas', '100LL AvGas'), ('94 Unleaded', '94 Unleaded'), ('Jet-A','Jet-A'),('100 Unleaded', '100 Unleaded')])
    fuel_price = StringField("Fuel Price", validators=[DataRequired()])
    date_of_pricing = DateField("Date Of Pricing", validators=[DataRequired()])