import datetime
from backend.users.model import User , UserSchema
from backend.db import db
from werkzeug.security import check_password_hash,generate_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_jwt_identity, set_access_cookies, jwt_required, unset_jwt_cookies
from flask import Blueprint,request,jsonify 

auth = Blueprint('auth',__name__,url_prefix='/auth') #the auth blueprint

@auth.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(datetime.timezone.utc)
        current_timestamp = datetime.timestamp(now)

        # Check if the token is about to expire (within the next 5 minutes)
        if exp_timestamp - current_timestamp < 5 * 60:
            # If the token is about to expire, generate a new token and set it as a cookie
            identity = get_jwt_identity()
            access_token = create_access_token(identity=identity)
            set_access_cookies(response, access_token)

        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

#registering a new user
@auth.route('/register/<user_type>', methods=['POST'])
def create_user(user_type):
    data = request.get_json()

    if request.method == "POST":
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        email = data.get('email')
        contact = data.get('contact')
        password = data.get('password')

        if not contact:
            return jsonify({'error': "Please enter your contact"}), 400

        elif not first_name:
            return jsonify({'error': "First name is required"}), 400

        elif not last_name:
            return jsonify({'error': "Last name is required"}), 400

        elif len(first_name) < 4:
            return jsonify({'error': "First name should not be less than four characters"}), 400

        elif len(last_name) < 4:
            return jsonify({'error': "Last name should not be less than four characters"}), 400

        elif len(password) < 6:
            return jsonify({'error': "Password is not sufficient"}), 400

        existing_contact = User.query.filter_by(contact=contact).first()
        if existing_contact:
            return jsonify({'error': "Phone number is already in use"}), 409
        
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            return jsonify({'error': "Email is already in use"}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(first_name=first_name, last_name=last_name, email=email, contact=contact,
                        password=hashed_password, user_type=user_type)

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Successfully registered new user', 'data': UserSchema().dump(new_user)}), 201
    

#user login
@auth.route("/login", methods=["POST"])
# @jwt_required()
def login():
    contact = request.json.get("contact")
    password = request.json.get("password")
    user = User.query.filter_by(contact=contact).first()

    if not contact or not password:
        return jsonify({"message": "Both email and password are required"}), 400
  
    
    if user:
      check_password = check_password_hash(user.password, password)
      
      if check_password:
          access_token = create_access_token(identity=user.id) #to make JSON Web Tokens for authentication
          refresh = create_refresh_token(identity=user.id)

          return jsonify({
          "message":"Successfully logged in a user",
          "access_token":access_token,
          "refresh_token":refresh,
          "user_type": user.user_type,
          "for": {
              "name": f"{user.first_name} {user.last_name}",
              "id": user.id,
              "first_name": user.first_name,
          }}) #to access a token
      else:
        return jsonify({"password_error": "Invalid password"}), 401
    else:
        return jsonify({"contact_error": "contact doesn't exist"}), 401  

# Add this route to unset JWT cookies when logging out
@auth.route("/logout", methods=["POST"])
def logout_cookies():
    response = jsonify({"message": "Cookies unset"})
    unset_jwt_cookies(response)
    return response, 200