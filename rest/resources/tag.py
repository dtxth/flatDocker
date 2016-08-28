from flask_restful import Resource
from common.utils import to_json

class Tag(Resource):
    def get(self):
        # docs_list = list(mongo.db.file.find({}, {"_id": 0}))
        # docs_list = list(mongo.db.file.find().skip((current_page-1)*PAGE_SIZE).limit(PAGE_SIZE))
        # return to_json(docs_list)
        return to_json([{"name": "prime", "count": 2},
                        {"name": "tag1", "count": 4},
                        {"name": "tag2", "count": 4},
                        {"name": "tag3", "count": 4},
                        {"name": "tag4", "count": 4},
                        {"name": "tag5", "count": 4},
                        {"name": "tag6", "count": 4},
                        {"name": "tag7", "count": 9},
                        {"name": "tag8", "count": 9}])

    def post(self):
            return to_json({}), 201
