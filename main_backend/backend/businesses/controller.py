#importing libraries
from flask import jsonify, request, Blueprint
from backend.users.model import User
from backend.businesses.model import Business, BusinessSchema
from flask_jwt_extended import get_jwt_identity, jwt_required
from backend.db import db

#creating a blue print of the reviews
all_businesses = Blueprint('businesses', __name__,url_prefix='/businesses') 

#create the businesses endpoints
# get all
@all_businesses.route('/', methods =['GET'])
@jwt_required()
def businesses():
     businesses= Business.query.all()
     results = [
            {
                "id":business.id,
                "bus_name":business.bus_name,
                "email_addr":business.email_addr,
                "logo":business.logo,
                "phone":business.phone,
                "description":business.description,
                "employees":business.employees,
                "locations_id":business.locations_id,
                "user_id":business.user_id,
                "created_at": business.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for business in businesses]
        
     return {"count":len(businesses), "business":results} 

# create new
@all_businesses.route('/create/<int:id>', methods =['POST','GET'])
@jwt_required()
def new_business(id):
    data = request.get_json()

    if request.method == "POST":
        bus_name = data.get('bus_name')
        email_addr = data.get('email_addr')
        phone = data.get('phone')
        logo = data.get('logo')
        description = data.get('description')
        video_url = data.get('videoUrl')
        business_category_id = data.get('business_category_id')

        current_user = User.query.get(id).id

        #validations
        if not bus_name:
            return jsonify({'error':"Enter business name.."}), 400
        
        if len(bus_name) < 5 :
            return jsonify({'error':"Business name cannot be less than 5 characters!"})
        
        if not email_addr:
            return jsonify({'error': "Enter the email_address"})
        
        if not phone:
            return jsonify({'error': "Phone is required"})

    #storing the new reviews data
        new_business = Business(bus_name=bus_name,user_id=current_user, email_addr=email_addr,phone=phone,description=description,logo=logo,video_url=video_url, business_category_id=business_category_id)

        #add the new review
        db.session.add(new_business)
        db.session.commit()
        return jsonify({'success':True, 'message':'New business added!', 'data': BusinessSchema().dump(new_business)}), 200


#reading
@all_businesses.route('/business/<int:id>', methods = ['GET'])
# @jwt_required()
def get_business(id):
    business = Business.query.get(id)

    return jsonify({'data': BusinessSchema().dump(business)}), 200

#updating
@all_businesses.route('/update/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_business(id):
     business = Business.query.get_or_404(id)
     business.bus_name = request.json['bus_name']
     business.phone = request.json['phone']

     db.session.add(business)
     db.session.commit()
     return jsonify({'message':'successfully updated'})

#deleting
@all_businesses.route('/delete/<int:id>',methods = ['DELETE'])
@jwt_required()
def delete_business(id):
     business = Business.query.get_or_404(id)
     db.session.delete(business)
     db.session.commit()
     return jsonify({'message':f'{business.bus_name} successfully deleted'}) ,200

@all_businesses.route('/check-business-status/<int:id>', methods=['GET'])
@jwt_required()
def check_business_status(id):
    current_user = User.query.get(id).id

    # Query the database to check if the user has a business
    business = Business.query.filter_by(user_id=current_user).first()

    if business:
        # User has a business
        return jsonify({'has_business': True, 'business_id': business.id})
    else:
        # User does not have a business
        return jsonify({'has_business': False})
