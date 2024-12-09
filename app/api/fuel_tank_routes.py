from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, FuelTank
from app.forms import FuelTankForm
from datetime import date


fuel_tank_routes = Blueprint("fuel_tank",__name__)


#display all tanks
### tested
@fuel_tank_routes.route("/all/tanks")
@login_required
def get_all_fuel_tanks():
    fuel_tanks = FuelTank.query.all()
    return {"fuel_tanks": [fuel_tank.to_dict() for fuel_tank in fuel_tanks]}, 200


#display one fuel tank by ID
### tested
@fuel_tank_routes.route("/<int:tankId>")
@login_required
def fuel_tank_by_id(tankId):
    fuel_tank = FuelTank.query.get(tankId)
    print(fuel_tank)
    if not fuel_tank:
        return jsonify({"message":"Fuel Tank Couldnt be found"}),404
    return jsonify(fuel_tank.to_dict()), 200

#creating a fuel_tank
### tested
@fuel_tank_routes.route("/new", methods = ['POST'])
@login_required
def create_fuel_tank():
    
    form = FuelTankForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    

    if form.validate_on_submit():
        new_fuel_tank = FuelTank(
            created_by_user_id=current_user.id,
            tank_name = form.data["tank_name"],
            fuel_type = form.data["fuel_type"],
            fuel_capacity = form.data['fuel_capacity'],
            usable_fuel = form.data["usable_fuel"],
            threshold_level= form.data["threshold_level"],
            last_inspection_date = form.data['last_inspection_date'],
            next_inspection_due = form.data['next_inspection_due'],
            maintenance_status = form.data['maintenance_status']
        )
        db.session.add(new_fuel_tank)
        db.session.commit()
        
        return new_fuel_tank.to_dict(), 201
    else:
        return {"errors":form.errors},400
    


### update fuel tank info
### tested
@fuel_tank_routes.route("/<int:tank_id>/update", methods = ["PUT"])
@login_required
def update_fuel_tank(tank_id):
    fuel_tank = FuelTank.query.get(tank_id)
    if not fuel_tank:
        return {"message":"Fuel couldnt be found"}, 404
    
    form = FuelTankForm()
    
    form["csrf_token"].data = request.cookies["csrf_token"]

    
    if form.validate_on_submit():
        try:
            last_inspection_date = date.combine(
            form.data["last_inspection_date"], date.min.time())
            
            next_inspection_due = date.combine(
                form.data["next_inspection_due"], date.min.time())

            fuel_tank.tank_name = form.data["tank_name"]
            fuel_tank.fuel_type = form.data["fuel_type"]
            fuel_tank.fuel_capacity = form.data['fuel_capacity']
            fuel_tank.usable_fuel = form.data["usable_fuel"]
            fuel_tank.notes = form.data["notes"]
            fuel_tank.threshold_level= form.data["threshold_level"]
            fuel_tank.last_inspection_date = last_inspection_date
            fuel_tank.next_inspection_due = next_inspection_due
            fuel_tank.maintenance_status = form.data['maintenance_status']
            
            db.session.commit()
            
            return fuel_tank.to_dict()
        except KeyError as e:
            return {"message": f"Missing field: {str(e)}"}, 400
        except ValueError as e:
            return {"message": f"Invalid value: {str(e)}"}, 400
    print(form.errors)
    return form. errors, 400
    

### delete fuel tank
### tested
@fuel_tank_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_fuel_tank(id):
    tank = FuelTank.query.get(id)
    if not tank:
        return {"message":"Tank not found"},404
    
    db.session.delete(tank)
    db.session.commit()
    
    return {"Message":"Succesfully Deleted Fuel Tank"},200


### update fuel level
### tested
@fuel_tank_routes.route("/<int:id>/fuel", methods=["POST"])
@login_required
def update_fuel_level(id):
    data = request.get_json()
    print("Received data:", data)
    usable_fuel = data.get("usable_fuel")  

    tank = FuelTank.query.get(id)
    
    if not tank:
        return {"message": "Tank not found"}, 404


    if usable_fuel < 0 and tank.usable_fuel + usable_fuel < 2000:
        return {"message": "Can't go below the threshold"}, 400
    
    if usable_fuel > 0 and tank.usable_fuel + usable_fuel > 10000:
        return {"message":"Can't go higher than tank capictiy"},400 


    tank.usable_fuel += usable_fuel
    db.session.commit()  

    return {"message": "Fuel level updated", "usable_fuel": tank.usable_fuel}

### low fuel warning
### tested
@fuel_tank_routes.route("/low-fuel-warning")
@login_required
def low_fuel_warning():

    warning_level = request.args.get("warning_level", default=5000, type=int)
    
    warning_tanks = FuelTank.query.filter(
        (FuelTank.usable_fuel < warning_level) 
    ).all()
    
    for tank in warning_tanks:
        if tank.usable_fuel == tank.threshold_level:
            tank.usable_fuel = 0
    return {
        "warning": f"Tanks with less than {warning_level} gallons of usable fuel",
        "warning_tanks": [tank.to_dict() for tank in warning_tanks]
    }