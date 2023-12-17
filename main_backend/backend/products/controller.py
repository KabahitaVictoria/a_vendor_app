#importing libraries
from flask import jsonify, request, Blueprint
from backend.products.model import Product, ProductSchema
from flask_jwt_extended import jwt_required
from backend.db import db
from backend.businesses.model import Business
# from backend.users.model import User

#creating a blue print of the reviews
all_products = Blueprint('products', __name__,url_prefix='/products') 

#create the products endpoints
# get all
@all_products.route('/', methods =['GET'])
@jwt_required()
def products():
    
     products= Product.query.all()
     results = [
            {
                "id":product.id,
                "name":product.name,
                "price":product.price,
                "image":product.image,
                "origin":product.origin,
                "created_at": product.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                "businesses_id":product.businesses_id
            }for product in products]
        
     return {"count":len(products), "products":results} 

# create new
@all_products.route('/create/<int:id>', methods =['POST','GET'])
@jwt_required()
def new_product(id):
    name = request.json.get('name')
    price = request.json.get('price')
    quantity = request.json.get('quantity')
    category_id = request.json.get('category_id')
    description =  request.json.get('description')
    
    current_business = Business.query.get(id)
    current_business_id = Business.query.get(id).id
    business_category_id = current_business.business_category_id
    user_id = current_business.user_id

    #validations
    if not name or not price or not quantity:
        return jsonify({'error': "Name, price, and quantity are required"}), 400

    # if (image_url and video_url) or (not image_url and not video_url):
    #     return jsonify({'error': "Provide either an image URL or a video URL, not both or none"}), 400

    #storing the new reviews data
    new_product = Product(
        name=name,
        price=price,
        quantity=quantity,
        businesses_id = current_business_id,
        category_id=category_id,
        business_category_id=business_category_id,
        user_id=user_id,
        description=description
    )

    #add the new review
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'success':True, 'message':'product has been added! '}), 201


#reading
@all_products.route('/product/<int:id>', methods = ['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)

    # response = {
    #         "id":product.id,
    #         "name":product.name,
    #         "price":product.price,
    #         "quantity":product.quantity,
    #         "image":product.image_url,
    #         "video": product.video_url,
    #         "created_at": product.created_at.strftime('%Y-%m-%d %H:%M:%S'),
    #         "businesses_id":product.businesses_id,
    #     } 
    # db.session.add(response)
    # db.session.commit()
    return jsonify({'message':'successful', 'data': ProductSchema().dump(product)})

#updating
@all_products.route('/update/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_review(id):
     product = Product.query.get_or_404(id)
     
     product.price = request.json['price']
     product.quantity = request.json['quantity']
     product.description = request.json['description']

     db.session.add(product)
     db.session.commit()
     return jsonify({'message':'successfully updated'})

#deleting
@all_products.route('/delete/<int:id>',methods = ['DELETE'])
@jwt_required()
def delete_product(id):
     product = Product.query.get_or_404(id)
     db.session.delete(product)
     db.session.commit()
     return jsonify({'message':f'{product.name} successfully deleted'})
