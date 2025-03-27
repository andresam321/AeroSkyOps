from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed#, FileRequired
from wtforms import StringField, IntegerField,SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import QRCode
from ..api.aws_helpers import ALLOWED_EXTENSIONS



class QRCodeForm(FlaskForm):
    qr_code_url = FileField("QR Code Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    qr_code_data = StringField("QR Code Data", validators=[DataRequired()])
  