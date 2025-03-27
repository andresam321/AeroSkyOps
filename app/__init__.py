import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.parking_routes import parking_routes
from .api.aircraft_routes import aircraft_routes
from .api.airport_area_routes import airport_area
from .api.owner_routes import owner_routes
from .api.fueling_routes import fueling_routes
from .api.flightaware_api_routes import flightaware_routes
from .api.fuel_price_routes import fueling_price_routes
from .api.parking_history_routes import parking_history_routes
from .api.fuel_tank_routes import fuel_tank_routes
from .api.aircraft_fuel_log_routes import aircraft_fuel_log_routes
from .api.QRCode_routes import qr_code_routes

from .seeds import seed_commands
from .config import Config

login = LoginManager() 

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')
    app.config.from_object(config_class)

    # Setup login manager
    login.init_app(app)
    login.login_view = 'auth.unauthorized'
    db.init_app(app)
    Migrate(app, db)
    # Application Security
    csrf = CSRFProtect()
    csrf.init_app(app)
    CORS(app, supports_credentials=True)
    app.cli.add_command(seed_commands)


    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))


    # Tell flask about our seed commands

    app.config.from_object(Config)

    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(parking_routes, url_prefix='/api/parking_spots')
    app.register_blueprint(aircraft_routes, url_prefix='/api/aircrafts')
    app.register_blueprint(airport_area, url_prefix='/api/airport_area')
    app.register_blueprint(owner_routes, url_prefix='/api/owners')
    app.register_blueprint(fueling_routes, url_prefix='/api/fuelings')
    app.register_blueprint(fueling_price_routes, url_prefix='/api/prices')
    app.register_blueprint(fuel_tank_routes, url_prefix='/api/fuel_tank')
    app.register_blueprint(flightaware_routes, url_prefix='/api/flightaware')
    app.register_blueprint(parking_history_routes, url_prefix='/api/history')
    app.register_blueprint(aircraft_fuel_log_routes, url_prefix='/api/aircraft_fuel_logs')
    app.register_blueprint(qr_code_routes, url_prefix='/api/qr_codes')



# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)


    @app.after_request
    def inject_csrf_token(response):
        is_production = os.environ.get('FLASK_ENV') == 'production'
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=is_production,
            httponly=is_production,
            samesite="Strict" if is_production else "Lax"
        )
        return response



    @app.route("/api/docs")
    def api_help():
        """
        Returns all API routes and their doc strings
        """
        acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                        app.view_functions[rule.endpoint].__doc__ ]
                        for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
        return route_list


    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        """
        This route will direct to the public directory in our
        react builds in the production environment for favicon
        or index.html requests
        """
        if path == 'favicon.ico':
            return app.send_from_directory('public', 'favicon.ico')
        return app.send_static_file('index.html')


    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    return app