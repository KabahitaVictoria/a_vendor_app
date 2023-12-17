#importing libraries
from flask import jsonify, request, Blueprint
from backend.notifications.model import Notification, NotificationSchema
from flask_jwt_extended import jwt_required
from backend.db import db
from backend.businesses.model import Business
from backend.users.model import User
from backend.products.model import Product

#create a blue print 
all_notifications = Blueprint('notifications', __name__,url_prefix='/notifications') 

#create the notifications endpoints
# get all
@all_notifications.route('/<int:id>', methods =['GET'])
@jwt_required()
def notifications(id):
    
     notifications= Notification.query.filter_by(businesses_id=id).all()

     results = [
            {
                "id":notification.id,
                "description":notification.description,
                "for": {
                    "user_id": notification.user_id,
                    "first_name": User.query.get(notification.user_id).first_name,
                    "last_name": User.query.get(notification.user_id).last_name,
                    "email": User.query.get(notification.user_id).email,
                    "contact": User.query.get(notification.user_id).contact,
                }
            } for notification in notifications]
        
     return {"count":len(notifications), "notifications":results} 

# create new
@all_notifications.route('/create/<int:id>', methods =['POST','GET'])
def new_notification(id):
    
    data = request.get_json()
    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data['quantity']
    businesses_id = Business.query.get(id).id

    product_name = Product.query.get(product_id).name

    description = f"User has ordered {quantity} packets of product: {product_name}."

    #validations
    if not description:
       return jsonify({'error':"description is required"}), 400

    #storing the new data
    new_notification = Notification(description=description,user_id=user_id,businesses_id=businesses_id)

    #add the new data
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'success':True, 'message':'Notification has been successfully sent!'}), 201
# 'data': NotificationSchema().dump(new_notification)}


#reading
@all_notifications.route('/notification/<int:id>', methods = ['GET'])
@jwt_required()
def get_notification(id):
    notification = Notification.query.get_or_404(id)

    response = {
            "id":notification.id,
            "description":notification.description,
            "user_id":notification.user_id
        } 
    db.session.add(response)
    db.session.commit()
    return jsonify({'message':'successful '})

#updating
@all_notifications.route('/update/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_order(id):
     notification = Notification.query.get_or_404(id)
     notification.description = request.json['description']
     notification.user_id = request.json['user_id']

     db.session.add(notification)
     db.session.commit()
     return jsonify({'message':'successfully updated'})

#deleting
@all_notifications.route('/delete/<int:id>',methods = ['DELETE'])
@jwt_required()
def delete_notification(id):
     notification = Notification.query.get_or_404(id)
     db.session.delete(notification)
     db.session.commit()
     return jsonify({'message':'notification deleted successfully'})
