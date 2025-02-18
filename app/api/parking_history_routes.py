from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import ParkingHistory
from app.forms import ParkingHistoryForm



parking_history_routes = Blueprint("history", __name__)

@parking_history_routes.route("/<int:parking_spot_id>")
@login_required
def parking_history_by_parking_spot(parking_spot_id):
    
    parking_histories = ParkingHistory.query.filter_by(parking_spot_id=parking_spot_id).all()
    if not parking_histories:
        return {"message":"No current history for this current parking spot"},404
    
    data = [parking_history.to_dict() for parking_history in parking_histories]
    
    return {"history":data}, 200
    