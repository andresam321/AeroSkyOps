from app.models import db, environment, SCHEMA, QRCode
from sqlalchemy.sql import text
import qrcode
# from PIL import Image
from io import BytesIO
from app.api.aws_helpers import upload_qrcode_to_s3, get_unique_filename

def seed_QR_code():
    qr_codes = [
        {"area_id": 1, "qr_code_data": "Area 1 - North Area"},
        {"area_id": 2, "qr_code_data": "Area 2 - East Area"},
        {"area_id": 3, "qr_code_data": "Area 3 - West Area"},
        {"area_id": 4, "qr_code_data": "Area 4 - South Area"},
    ]

    for qr in qr_codes:
        # Generate QR Code
        qr_image = qrcode.make(qr["qr_code_data"])

        # Save QR Code to a BytesIO buffer
        buffer = BytesIO()
        qr_image.save(buffer, format="PNG")
        buffer.seek(0)

        # Generate a unique filename
        unique_filename = get_unique_filename("qr_code.png")

        # Upload to S3 with the correct filename
        upload_result = upload_qrcode_to_s3(buffer, unique_filename)

        if "url" in upload_result:
            qr_url = upload_result["url"]

            # Add to Database
            new_qr = QRCode(
                area_id=qr["area_id"],
                qr_code_data=qr["qr_code_data"],
                qr_code_url=qr_url  # Save the uploaded image URL
            )
            db.session.add(new_qr)

    db.session.commit()



def undo_QR_code():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.qr_codes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM qr_codes"))

    db.session.commit()