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


@api.route('/signup', methods=['POST'])
def handle_signup():
    response_body = {}
    data = request.json
    user = User(email=data['email'],
                password=data['password'],
                is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body['message'] = 'User created successfully!'
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(User).where(User.email == email)).scalar()
    if user and password == user.password:
        access_token = create_access_token(identity=[email])
        return jsonify(access_token=access_token)
    else:
        response_body['message'] = 'Usuario no logeado'
        return response_body, 200


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
    if current_user[1]['name'] == 'Annie':
        response_body['message'] = "Este es el perfil de Annie"
        return response_body, 200
    response_body['message'] = "No tienes acceso a este perfil"
    return response_body, 401