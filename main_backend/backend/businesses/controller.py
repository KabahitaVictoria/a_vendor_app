#importing libraries
from flask import jsonify, request, Blueprint
from backend.businesses.model import Business
from flask_jwt_extended import jwt_required
from backend.db import db

#creating a blue print of the reviews
all_businesses = Blueprint('businesses', __name__,url_prefix='/businesses') 

#create the businesses endpoints
# get all
@all_businesses.route('/', methods =['GET'])
def businesses():
    
     businesses= Business.query.all()
     results = [
            {
                "bus_name":business.bus_name,
                "email_addr":business.email_addr,
                "logo":business.logo,
                "phone":business.phone,
                "city":business.city,
                "description":business.description,
                "employees":business.employees,
                "created_at": business.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }for business in businesses]
        
     return {"count":len(businesses), "businesss":results} 

# create new
@all_businesses.route('/create', methods =['POST','GET'])
@jwt_required()
def new_business():
    
    bus_name = request.json['bus_name']
    email_addr = request.json['email_addr']
    phone = request.json['phone']
    city = request.json['city']
    logo = request.json['logo']
    description = request.json['description']
    employees = request.json['employees']
    created_at = request.json['created_at']
    

    #validations
    if not bus_name:
       return jsonify({'error':"Enter business name.."}), 400
    
    if len(bus_name) < 5 :
        return jsonify({'error':"Business name cannot be less than 5 characters!"})
    
    if not email_addr:
        return jsonify({'error': "Enter the email_address"})
    
    if not city:
        return jsonify({'error': "Enter the city"})
    
    if len(city) < 5 :
        return jsonify({'error':"City name cannot be less than 5 characters!"})
    
    if not phone:
        return jsonify({'error': "Phone is required"})
    

    #storing the new reviews data
    new_business = Business( bus_name=bus_name, email_addr=email_addr,phone=phone,description=description,logo=logo,employees=employees,created_at=created_at)

    #add the new review
    db.session.add(new_business)
    db.session.commit()
    return jsonify({'success':True, 'message':'New business added! '}), 200


#reading
@all_businesses.route('/business/<int:id>', methods = ['GET'])
def get_business(id):
    business = Business.query.get_or_404(id)

    response = {
            "id":business.id,
            "bus_name":business.bus_name,
            "strt_address":business.strt_address,
            "phone":business.phone,
            "description":business.description,
            "logo":business.logo,
            "city":business.city
        } 
    db.session.add(business)
    db.session.commit()
    return jsonify({'message':'successful '}), 200

#updating
@all_businesses.route('/update/<int:id>', methods = ['PATCH'])
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
     return jsonify({'message':f'{business.name} successfully deleted'}) ,200
