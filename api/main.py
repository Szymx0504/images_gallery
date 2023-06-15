import os
import requests
# import json
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

# I needed to add newly installed dependencies to Pipfile myself (remember about it) [turned out that I had been using pip install instead of pipenv install]

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = int(os.environ.get("DEBUG", 1))

if not UNSPLASH_KEY:  # stop application from running since it's mandatory for the project
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG  # True/False


@app.route("/new-image")
def new_image():
    # a simple way to get a query parameter (notice that "query" here is actually a name of the argument in this case)
    word = request.args.get("query")
    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version": "v1"
    }
    params = {"query": word}
    # GET uses params, and POST uses data and json keyword arguments
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data  # since it's already in json format


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from the database
        # you need to add sth to filter the collection with, so if you put {} it will return all the records
        images = images_collection.find({})

        # we need to convert a list (Cursor object with multiple documents specifically) into a list of jsons, that's why we cannot use just json() function
        # now jsonify is able to convert a list of dictionaries into multiple json objects inside of the one variable (one list)
        return jsonify([img for img in images]) # I think list(images) could also work here
    if request.method == "POST":
        # save image in the database

        # request.data is in the string format
        # image = json.loads(request.data)
        # or you can use request.get_json() and get a python object directly
        image = request.get_json()
        # image["_id"] = image["_id"].toString()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


# file.json() (to python object), file.dumps() (to export as .json string)

# ofc everything here down below could be a list of this what was written:
# .json() : requests.models.Response => dict
# json.loads() : jsonString => dict
# json.dumps() : dict => jsonString
# jsonify() : dict => responseObject


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
    # cd .. returns you back to the previous file!

# 252525, FFFDFA
