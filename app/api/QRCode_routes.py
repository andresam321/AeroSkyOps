from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, QRCode
from app.forms import QRCodeForm
from .aws_helpers import upload_qrcode_to_s3, get_unique_filename
from datetime import datetime


qr_code_routes = Blueprint('qr_codes', __name__)

# Display all QR codes
#tested
@qr_code_routes.route("/all")
# @login_required
def all_qr_codes():
    qr_codes = QRCode.query.all()
    return {"qr_codes": [qr_code.to_dict() for qr_code in qr_codes]}, 200

# Display one QR code by ID
#tested
@qr_code_routes.route("/<int:id>")
# @login_required
def qr_code_by_id(id):
    qr_code = QRCode.query.get(id)
    if not qr_code:
        return {"message": "QR Code couldn't be found"}, 404
    return qr_code.to_dict(), 200

# Display qr code by area id

#tested
@qr_code_routes.route("/area/<int:id>")
# @login_required
def qr_code_by_area_id(id):
    qr_code = QRCode.query.filter(QRCode.area_id == id).all()
    if not qr_code:
        return {"message": "QR Code couldn't be found"}, 404
    return {"qr_codes": [qr.to_dict() for qr in qr_code]}, 200


# Create QR code
#untested
@qr_code_routes.route("/new", methods=["POST"])
# @login_required
def create_qr_code():
    print("In create form =>")

    form = QRCodeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    qr_code_data = request.form.get("qr_code_data")
    qr_code_url = request.form.get("qr_code_url")
    area_id = request.form.get("area_id")

    if not qr_code_data or not qr_code_url or not area_id:
        return {"error": "Missing required fields."}, 400

    qr_code_image = request.files.get("qr_code_image")
    url = None

    if qr_code_image:
        qr_code_image.filename = get_unique_filename(qr_code_image.filename)
        upload = upload_qrcode_to_s3(qr_code_image)
        if "url" not in upload:
            return {"error": "Image upload failed. Please try again."}, 500
        url = upload["url"]

    new_qr_code = QRCode(
        area_id=area_id,
        qr_code_data=qr_code_data,
        qr_code_url=qr_code_url,
        created_at=datetime.now()
    )

    db.session.add(new_qr_code)
    db.session.commit()
    print(form.errors)
    return new_qr_code.to_dict(), 201