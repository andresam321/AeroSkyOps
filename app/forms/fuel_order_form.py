from flask_wtf import FlaskForm
from wtforms import StringField,DateField,SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import FuelOrder


def check_firstName(form, field):
    if len(field.data) < 2:
        raise ValidationError("First Name must be at least 2 characters")
    


class FuelOrderForm(FlaskForm):
    fuel_type = SelectField("Fuel Type", choices = [('100ll AvGas', '100ll AvGas'), ('94 unleaded', '94 unleaded'), ('Jet A', 'Jet A'),('100 unleaded', '100 unleaded')])
    request_by = StringField("Request By", validators=[DataRequired()])
    positive_prist = SelectField("Positive Prist", choices = [('Yes', 'Yes'), ('No', 'No'), ('NA', 'NA')])
    quantity = StringField("Quantity", validators=[DataRequired()])
    paid = SelectField("Paid", choices=[('Yes', 'Yes'), ('No', 'No'), ('Call for payment', 'Call for payment')])
    service_deadline_by = StringField("Request By", validators=[DataRequired()])
    is_completed = SelectField("Is completed", choices=[('Yes', 'Yes'), ('No', 'No'), ('En Route', 'En Route')])
    order_date = StringField("Order Date")