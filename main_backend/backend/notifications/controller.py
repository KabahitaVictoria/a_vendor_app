#importing libraries
from flask import jsonify, request, Blueprint
from backend.notifications.model import Notification, NotificationSchema
from flask_jwt_extended import jwt_required
from backend.db import db
from backend.businesses.model import Business, BusinessSchema
from backend.users.model import User, UserSchema
from backend.products.model import Product, ProductSchema

#create a blue print 
all_notifications = Blueprint('notifications', __name__,url_prefix='/notifications') 

#create the notifications endpoints
# get all notifications of particular business
@all_notifications.route('/<int:id>', methods =['GET'])
@jwt_required()
def notifications(id):
     # Fetch all notifications for the given user_id
    notifications = Notification.query.filter_by(businesses_id=id).all()

    # Serialize the notifications using NotificationSchema
    notification_result = []

    # Fetch additional information using UserSchema, BusinessSchema, and ProductSchema
    user_schema = UserSchema(only=['id', 'first_name', 'last_name', 'email', 'contact'])
    business_schema = BusinessSchema(only=['id', 'bus_name'])
    product_schema = ProductSchema(only=['id', 'name', 'price'])

    for notification in notifications:
        notif_data = NotificationSchema().dump(notification)

        user_id = notification.user_id
        if user_id:
            notif_data['user'] = user_schema.dump(User.query.get(user_id))

        business_id = notification.businesses_id
        if business_id:
            notif_data['business'] = business_schema.dump(Business.query.get(business_id))

        product_id = notification.product_id
        if product_id:
            notif_data['product'] = product_schema.dump(Product.query.get(product_id))
        else:
            notif_data['product'] = None
        notification_result.append(notif_data)

    return {"count": len(notifications), "notifications": notification_result}


# get all notifications of particular user
@all_notifications.route('/user_notifications/<int:id>', methods=['GET'])
@jwt_required()
def get_user_notifications(id):
    # Fetch all notifications for the given user_id
    notifications = Notification.query.filter_by(user_id=id).all()
    print('Notifications:', NotificationSchema().dump(notifications))

    # Serialize the notifications using NotificationSchema
    notification_result = []

    # Fetch additional information using UserSchema, BusinessSchema, and ProductSchema
    user_schema = UserSchema(only=['id', 'first_name', 'last_name', 'email', 'contact'])
    business_schema = BusinessSchema(only=['id', 'bus_name'])
    product_schema = ProductSchema(only=['id', 'name', 'price', 'quantity'])

    for notification in notifications:
        notif_data = NotificationSchema().dump(notification)

        user_id = notification.user_id
        if user_id:
            notif_data['user'] = user_schema.dump(User.query.get(user_id))

        business_id = notification.businesses_id
        if business_id:
            notif_data['business'] = business_schema.dump(Business.query.get(business_id))

        product_id = notification.product_id
        if product_id:
            notif_data['product'] = product_schema.dump(Product.query.get(product_id))
        else:
            notif_data['product'] = None
        notification_result.append(notif_data)


    return {"count": len(notifications), "notifications": notification_result}


# create new
@all_notifications.route('/create/<int:id>', methods =['POST','GET'])
def create_notification(id):
    
    data = request.get_json()
    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data['quantity']
    businesses_id = Business.query.get(id).id

    product_name = None
    if product_id:
        product = Product.query.get(product_id)
        if product:
            product_name = product.name

    description = f"User has ordered {quantity} packets."

    #validations
    if not description:
       return jsonify({'error':"description is required"}), 400

    #storing the new data
    new_notification = Notification(
        quantity=quantity,
        user_id=user_id,
        businesses_id=businesses_id,
        product_id=product_id,
        description=description
    )

    #add the new data
    db.session.add(new_notification)
    db.session.commit()

    result = NotificationSchema().dump(new_notification)
    return jsonify({'success': True,
                    'message': 'Notification has been successfully sent!',
                    'data': result}), 201

#reading
@all_notifications.route('/notification/<int:id>', methods = ['GET'])
@jwt_required()
def get_notification(id):
    notification = Notification.query.get_or_404(id)

    notification_schema = NotificationSchema()
    result = notification_schema.dump(notification)

    return jsonify({'data': result, 'message': 'Successful'})

#updating
@all_notifications.route('/update/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_order(id):
    notification = Notification.query.get_or_404(id)

    data = request.get_json()
    new_quantity = data.get('quantity', notification.quantity)

    notification.quantity = new_quantity
    notification.description = data.get('description', notification.description)

    db.session.commit()

    return jsonify({'message': 'Successfully updated'})

# deleting
@all_notifications.route('/delete/<int:id>',methods = ['DELETE'])
@jwt_required()
def delete_notification(id):
     notification = Notification.query.get_or_404(id)
     db.session.delete(notification)
     db.session.commit()
     return jsonify({'message':'notification deleted successfully'})
