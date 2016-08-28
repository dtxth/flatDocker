from flask_restful import Api
from app import app
from resources.file import File
from resources.tag import Tag


api = Api(app)
api.add_resource(File, "/files", "/files/<int:current_page>", endpoint='current_page')
api.add_resource(Tag, "/tags")

if __name__ == "__main__":
    app.run(debug=True)
