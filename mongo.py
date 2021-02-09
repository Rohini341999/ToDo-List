from flask import Flask, jsonify, request, json 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId 
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'reactloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/reactloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/register', methods=["POST"])
def register():
    users = mongo.db.users 
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    username = request.get_json()['username']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = users.insert({
        'first_name': first_name,
        'last_name': last_name,
        'username': username,
        'password': password,
        'created': created 
    })

    new_user = users.find_one({'_id': user_id})

    result = {'username': new_user['username'] + ' added'}

    return jsonify({'result' : result})

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users 
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'username': username})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'username': response['username']
            })
            result = jsonify({'token':access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result 

@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    tasks = mongo.db.tasks

    result = []

    for field in tasks.find():
        result.append({'_id': str(field['_id']), 'title': field['title']})

    return jsonify(result)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    tasks = mongo.db.tasks 
    title = request.get_json()['title']

    task_id = tasks.insert({'title': title})
    new_task = tasks.find_one({'_id':task_id})

    result = {'title' : new_task['title']}

    return jsonify({'result': result})

@app.route('/api/tasks/<id>', methods=['PUT'])
def update_task(id):
    tasks = mongo.db.tasks 
   # title = request.get_json()['title']

    tasks.find_one_and_update({'_id': ObjectId(id)}, {"$set": {"title": title}}, upsert=False)
    new_task = tasks.find_one({'_id': ObjectId(id)})

    result = {'title' : new_task['title']}

    return jsonify({"result": result})

@app.route('/api/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    tasks = mongo.db.tasks 
    
    response = tasks.find_one({'_id': ObjectId(id)})
    deleted = tasks.delete_one(response)
    return jsonify({'deleted' : deleted})

if __name__ == '__main__':
    app.run(debug=True)

