from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, FuelTank
from app.forms import FuelTankForm


fuel_tank_routes = Blueprint("fuel_tank",__name__)


#display all tanks
#untested
@fuel_tank_routes("/all/tanks")
@login_required
def get_all_fuel_tanks():
    fuel_tanks = FuelTank.query.all()
    return {"fuel_tanks": [fuel_tank.to_dict() for fuel_tank in fuel_tanks]}, 200


#display one fuel tank by ID
#untested
@fuel_tank_routes("/<int:id>")
@login_required
def fuel_tank_by_id(id):
    fuel_tank = FuelTank.query.get(id)
    if not fuel_tank:
        return {"message":"Fuel Tank Couldnt be found"},404
    return fuel_tank.to_dict(), 200



#creating a fuel_tank
#untested
@fuel_tank_routes("/new", methods = ['POST'])
@login_required
def create_fuel_tank():
    
    form = FuelTankForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    

    if form.validate_on_submit():
        new_fuel_tank = FuelTank(
                    

    

    )
    pass