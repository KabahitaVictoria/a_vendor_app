#importing libraries
from flask import jsonify, request, Blueprint
from backend.categories.model import Category, CategorySchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db
from backend.products.model import Product, ProductSchema
from backend.businesses.model import Business

#creating a blue print of the reviews
all_categories = Blueprint('categories', __name__,url_prefix='/categories') 

#create the categories endpoints
# get all
@all_categories.route('/<int:id>/', methods =['GET'])
# @jwt_required()
def categories(id):
    categories = Category.query.filter_by(businesses_id=id).all()

     # Serialize categories including products
    categories_with_products = []

    for category in categories:
        category_data = CategorySchema().dump(category)
        products = Product.query.filter_by(category_id=category.id).all()

        product_schema = ProductSchema(many=True)
        category_data['products'] = product_schema.dump(products)
        
        categories_with_products.append(category_data)

    return jsonify({"count": len(categories), "data": categories_with_products})

# create new
@all_categories.route('/<int:id>/create', methods =['POST','GET'])
@jwt_required()
def new_category(id):
    name = request.json['name']
    current_business_id = Business.query.get(id).id

    #validations
    if not name:
       return jsonify({'error':"category name is required"}), 400

    new_category = Category(name=name, businesses_id=current_business_id)

    #add the new review
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'success':True, 'message':'New category stored!', 'data': CategorySchema().dump(new_category)}), 201


#reading
@all_categories.route('/category/<int:id>', methods = ['GET'])
def get_category(id):
    category = Category.query.get_or_404(id)

    response = {
            "id":category.id,
            "name":category.name,
            "image":category.image,
            "businesses_id":category.businesses_id,
            "created_at": category.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } 
    db.session.add(response)
    db.session.commit()
    return jsonify({'message':'successful '})

#updating
@all_categories.route('/update/<int:id>', methods = ['PATCH'])
@jwt_required()
def update_category(id):
     category = Category.query.get_or_404(id)
     category.name = request.json['name']
     category.description = request.json['description']

     db.session.add(category)
     db.session.commit()
     return jsonify({'message':'successfully updated'})

#deleting
@all_categories.route('/delete/<int:id>',methods = ['DELETE'])
@jwt_required()
def delete_category(id):
     category = Category.query.get_or_404(id)
     db.session.delete(category)
     db.session.commit()
     return jsonify({'message':f'{category.name} successfully deleted'})
