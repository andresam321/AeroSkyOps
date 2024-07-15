from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, FuelOrder
from app.forms import FuelOrderForm


fueling_routes = Blueprint("fuelings", __name__)


@fueling_routes.route("/all")
@login_required
def all_fuel_request():
    fuel_requests = FuelOrder.query.all()
    return {"fuel_request":[fuel_request.to_dict() for fuel_request in fuel_requests]}


#uppdate fueling status only
@fueling_routes.route("/<int:id>/update/status", methods=["PUT"])
@login_required
def update_fuel_status(id):
    fuel_order = FuelOrder.query.get(id)
    if not fuel_order:
        return jsonify({"error": "Fuel order not found"}), 404
    
    data = request.json
    if "is_completed" not in data:
        return jsonify({"message": "Missing 'is_completed' field"}), 400
    
    new_status = data["is_completed"]
    if new_status not in ["Yes", "No", "En Route"]:
        return jsonify({"error": "Invalid status value"}), 400
    
    fuel_order.is_completed = new_status
    fuel_order.completed_by_user_id = current_user.id  # Record the user who completes the request
    db.session.commit()

    return jsonify({
        "message": f"Fuel order status updated to '{new_status}'",
        "completed_by_user_id": fuel_order.completed_by_user_id,
        "fuel_order": fuel_order.to_dict()
    })

@fueling_routes.route("<int:parking_id>/new/fuel_request", methods = ["POST"])
@login_required
def create_fuel_request_on_parking_spot(parking_id):
    
    form = FuelOrderForm
    form["csrf_token"].data = request.cookies["csrf_token"] 



