import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

# I needed to add newly installed dependencies to Pipfile myself (remember about it)

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = int(os.environ.get("DEBUG", 1))

if not UNSPLASH_KEY: # stop application from running since it's mandatory for the project
    raise EnvironmentError("Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG # True/False

@app.route("/")
def hello():
    return "Hello world!"

@app.route("/new-image")
def new_image():
    word = request.args.get("query") # a simple way to get a query parameter (notice that "query" here is actually a name of the argument in this case)
    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version": "v1"
    }
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data # since it's already in json format

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
    # cd .. returns you back to the previous file!

# 252525, FFFDFA