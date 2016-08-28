import os
from flask import request, flash
from flask_pymongo import PyMongo
from flask_restful import Resource
from common.utils import to_json, get_metadata
from app import *
from werkzeug.utils import secure_filename
import datetime


class File(Resource):
    def get(self, current_page=1):
        print request.args
        tags = request.args.get('tags', None)
        if tags:
            tags = tags.split(",")
            print tags
            # mongo.db.file.find()

                            # return to_json(docs_list)

        # docs_list = list(mongo.db.file.find({}, {"_id": 0}))
        docs_list = list(
            mongo.db.file.find()
            # .sort({'_id': 1})
            .skip((current_page - 1) * PAGE_SIZE).limit(PAGE_SIZE)
        )
        return to_json(docs_list)

    def post(self):
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            mimetype = file.content_type
            print "type >>>> {0}".format(mimetype)
            # fixme: add encode fro russian symbols

            filename = secure_filename(file.filename)

            file.save(os.path.join(UPLOAD_FOLDER, filename))
            print "filename >>>> {0}".format(filename)

            realname = os.path.join(UPLOAD_FOLDER, filename)
            # realname = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            meta = get_metadata(realname)

            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

            data = {"file": filename,
                    "path": "/{0}/{1}".format(FILE_DIRECTORY, filename),
                    "metadata": meta,
                    "date": now}

            print data
            mongo.db.file.insert(data)

            return to_json(data), 201

