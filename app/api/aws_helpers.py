import boto3
import botocore
import os
import uuid



BUCKET_NAME = os.environ.get("S3_BUCKET")
QRCODE_BUCKET_NAME = os.environ.get("S3_QRCODE_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
QRCODE_S3_LOCATION = f"https://{QRCODE_BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)


"""
qr code functions
"""


def upload_qrcode_to_s3(file, filename, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            QRCODE_BUCKET_NAME,
            filename,
            ExtraArgs={
                # "ACL": acl,
                "ContentType": "image/png" 
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        print(f"❌ S3 Upload Error: {e}")
        return {"errors": str(e)}
    return {"url": f"{QRCODE_S3_LOCATION}{filename}"}

def remove_qrcode_from_s3(image_url):
    # AWS needs the image file name, not the URL, 
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=QRCODE_BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"
    
def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                # "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        print(f"❌ S3 Upload Error: {e}")
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL, 
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True