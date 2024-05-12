from app import app, db, socketio, login_manager
from controller import controllers
from controller import admin_controllers
from flask_cors import CORS

app.register_blueprint(controllers.bp)
app.register_blueprint(admin_controllers.admin_bp)

if __name__ == "__main__":
    CORS(app, supports_credentials=True)
    socketio.run(app, debug=True)