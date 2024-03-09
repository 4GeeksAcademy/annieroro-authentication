"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return jsonify(response_body), 200


@api.route("/sign-up", methods=["POST"])
def signup():
    response_body = {}
    data = request.json
    user = User(username=data['username'],
                email=data['email'],
                password=data['password'],
                lastname=data['lastname'],
                is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body['message'] = 'User created successfully!'
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if user and password == user.password:
        access_token = create_access_token(identity=user.serialize())
        response_body['access_token'] = access_token
        response_body['message'] = "User logged suscesfully!"
        response_body['results'] = user.serialize()
        return response_body, 200
    else:
        response_body['message'] = "Error, incorrect email or password"
    return response_body


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user) 
    response_body['message'] = "Este es el perfil de ?"
    return response_body, 200
    response_body['message'] = "No tienes acceso a este perfil"
    return response_body, 402