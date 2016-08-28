from flask import Flask
from flask_pymongo import PyMongo
from flask_restful import Api

app = Flask(__name__)

# Configure data base instance
app.config["MONGO_DBNAME"] = "flat_docker_db"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:5000"

FILE_DIRECTORY = "media"
# Set Up file upload directory
UPLOAD_FOLDER = '/home/dtxth/test/uploaded'
ALLOWED_EXTENSIONS = set(['mp3', 'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return True
# return '.' in filename and \
#           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


# Set up page paginator settings
PAGE_SIZE = 10


