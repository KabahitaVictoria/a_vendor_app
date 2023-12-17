# Represents the small businesses listed on your app and includes details like business name, description, location, contact information, and products/services offered.
import importlib
from backend.db import db, ma
from datetime import datetime
# from backend.users.model import UserSchema

class Business(db.Model):
   __tablename__ = "businesses"

   from backend.categories.model import Category
   from backend.products.model import Product
   from backend.notifications.model import Notification

   id = db.Column(db.Integer, primary_key = True)
   bus_name = db.Column(db.String(100), unique = True)
   email_addr = db.Column(db.String(100), unique = True)
   phone = db.Column(db.String(15),unique = True)
   logo = db.Column(db.String(255),unique = True)
   description = db.Column(db.String(255),unique = False)
   video_url = db.Column(db.String(255),unique = False)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
   # locations_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
   business_category_id = db.Column(db.Integer, db.ForeignKey('business_categories.id'), nullable=False)
   
   #relationships
   products = db.relationship('Product', backref='business')
   categories = db.relationship('Category',backref='business')
   notifications = db.relationship('Notification', backref='business', lazy=True)

class BusinessSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = Business
      load_instance = True
   
   user_id = ma.auto_field()

   def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        BusinessCategorySchema = importlib.import_module('backend.business_categories.model').BusinessCategorySchema
        self.fields['business_category'] = ma.Nested(BusinessCategorySchema, many=False)
