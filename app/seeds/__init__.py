from flask.cli import AppGroup
from .users import seed_users, undo_users
from .parking_spot import seed_parkingSpots, undo_parkingSpots
from .aircraft import seed_aircrafts, undo_aircrafts
from .owner import seed_owners, undo_owners
from .fuel_order import seed_fuelOrders, undo_fuelOrders
from .airport_parking import seed_airport_parkings, undo_airport_parkings
from .fuel_pricing import seed_fuelPricing, undo_fuelPricing


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_fuelPricing()
        undo_airport_parkings()
        undo_fuelOrders()
        undo_owners()
        undo_parkingSpots()
        undo_aircrafts()
        undo_users()
    seed_users()
    seed_airport_parkings()
    seed_parkingSpots()
    seed_aircrafts()
    seed_owners()
    seed_fuelOrders()
    seed_fuelPricing()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_fuelPricing()
    undo_airport_parkings()
    undo_fuelOrders()
    undo_owners()
    undo_parkingSpots()
    undo_aircrafts()
    undo_users()
    
    # Add other undo functions here
