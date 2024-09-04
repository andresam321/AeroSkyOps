from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, FuelPricing
from app.forms import FuelPricingForm



fueling_price_routes = Blueprint("prices",__name__)


@fueling_price_routes.route("/all_fuel_prices")
@login_required
def all_fueling_price():
    fuel_prices = FuelPricing.query.all()
    return {"fuel_prices":[fuel_price.to_dict() for fuel_price in fuel_prices]}

