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


##edit fuel price 
##Untested
@fueling_price_routes.route("/<int:id>",  methods = ["PUT"])
@login_required
def edit_fuel_price(id):
    fuel_price = FuelPricing.query.get(id)
    if not fuel_price:
        return {"message":"Fuel Price Couldnt be Found"},404
    
    form = FuelPricingForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        fuel_price.type_of_fuel = form.data["type_of_fuel"]
        fuel_price.fuel_price = form.data["fuel_price"]
        fuel_price.date_of_pricing = form.data["date_of_pricing"]

        db.session.commit()
        return fuel_price.to_dict()
    print(form.errors)
    return form.errors,400
    