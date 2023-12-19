# query_functions.py
from backend.db import db
from backend.businesses.model import Business
from backend.business_categories.model import BusinessCategory

def get_businesses_by_category(category_id):
    try:
        business_query = db.session.query(
            Business, BusinessCategory
        ).join(
            BusinessCategory, Business.business_category_id == BusinessCategory.id
        ).filter(
            Business.business_category_id == category_id
        )

        results = business_query.all()

        businesses = []
        for business, category in results:
            businesses.append({
                'business_name': business.bus_name,
                'category_name': category.name
            })

        return businesses

    except Exception as e:
        return {'error': str(e)}
