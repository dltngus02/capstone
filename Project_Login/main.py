<<<<<<< HEAD
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from DB_models import model
from common import config
from DB_models.model import AutoBill, db, socketio
from flask_socketio import SocketIO


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.secret_key = 'your_secret_key'

    db.init_app(app)
    socketio.init_app(app)

    from controller import controllers
    from controller import admin_controllers
    app.register_blueprint(controllers.bp)
    app.register_blueprint(admin_controllers.admin_bp)

    return app

if __name__ == "__main__":
    app = create_app()
=======
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from DB_models import model
from common import config
from DB_models.model import AutoBill, db, socketio
from flask_socketio import SocketIO


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    app.secret_key = 'your_secret_key'

    db.init_app(app)
    socketio.init_app(app)

    from controller import controllers
    from controller import admin_controllers
    app.register_blueprint(controllers.bp)
    app.register_blueprint(admin_controllers.admin_bp)

    return app

if __name__ == "__main__":
    app = create_app()
>>>>>>> origin/master
    socketio.run(app)