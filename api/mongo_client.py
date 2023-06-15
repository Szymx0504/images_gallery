import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

# we're running all 4 containers in the same docker-compose file so their services accessible by their names
MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017) # if you type docker ps, you will the the port and mongo db running on it

mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT
)


def insert_test_document():
    """Inserts sample document to the test_collection in the test db"""

    # it is the name of a database in the mongo. If such database is absent, it will be created by mongo_client
    db = mongo_client.test
    test_collection = db.test_collection  # here we're creating a collection
    res = test_collection.insert_one({"name": "Szymon", "instructor": False})
    print(res)