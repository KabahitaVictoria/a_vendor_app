from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from backend.db import db
from backend.business_categories.model import BusinessCategory, BusinessCategorySchema
from backend.businesses.model import Business, BusinessSchema
import os

business_category_bp = Blueprint('business_categories', __name__,url_prefix='/business_categories')
business_category_schema = BusinessCategorySchema()

# Create a new business category
@business_category_bp.route("/business_categories/create", methods=["POST"])
def create_business_category():
        data = request.get_json()

        if request.method == "POST":
            name = request.json.get('name')
            icon = request.json.get('icon')

            if not name:
                return jsonify({'message': "Please enter the category name"}), 400

            elif not icon:
                return jsonify({'message': "Category icon is required"}), 400

        new_category = BusinessCategory(name=name, icon=icon)
        db.session.add(new_category)
        db.session.commit()
        return business_category_schema.jsonify(new_category), 201

# Get all business categories
@business_category_bp.route("/", methods=["GET"])
# @jwt_required()
def get_all_business_categories():
    business_categories = BusinessCategory.query.all()

    business_categories_with_businesses = []
    for business_category in business_categories:
        business_category_data = BusinessCategorySchema().dump(business_category)
        businesses = Business.query.filter_by(business_category_id=business_category.id).all()

        business_schema = BusinessSchema(many=True)
        business_category_data['products'] = business_schema.dump(businesses)
        business_category_data['icon'] = "/icons/" + os.path.basename(business_category_data['icon'])
        
        business_categories_with_businesses.append(business_category_data)

    return jsonify({"count": len(business_categories), "data": business_categories_with_businesses})

# Get a single business category by ID
@business_category_bp.route("/business_categories/<int:category_id>", methods=["GET"])
def get_business_category(category_id):
    category = BusinessCategory.query.get(category_id)
    if category:
        result = business_category_schema.dump(category)
        return jsonify(result)
    return jsonify({"error": "Business category not found"}), 404

# Update a business category by ID
@business_category_bp.route("/business_categories/<int:category_id>", methods=["PUT"])
def update_business_category(category_id):
    try:
        category = BusinessCategory.query.get(category_id)
        if not category:
            return jsonify({"error": "Business category not found"}), 404

        data = request.get_json()
        updated_category = business_category_schema.load(data)
        
        # Update specific fields
        category.name = updated_category.name
        category.icon = updated_category.icon

        db.session.commit()
        return business_category_schema.jsonify(category)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Delete a business category by ID
@business_category_bp.route("/business_categories/<int:category_id>", methods=["DELETE"])
def delete_business_category(category_id):
    category = BusinessCategory.query.get(category_id)
    if category:
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": "Business category deleted successfully"})
    return jsonify({"error": "Business category not found"}), 404
