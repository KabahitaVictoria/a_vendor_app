# Represents notifications sent to users or businesses regarding orders, updates, or other events.
from datetime import datetime
import importlib
from backend.db import db, ma

class Notification(db.Model):
   __tablename__ = "notification"
   id = db.Column(db.Integer, primary_key = True)
   quantity = db.Column(db.Integer, unique = False)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   businesses_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
   product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
   description = db.Column(db.String(255), nullable=False)
   created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

   
class NotificationSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = Notification
      load_instance = True

      def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        UserSchema = importlib.import_module('backend.users.model').UserSchema
        BusinessSchema = importlib.import_module('backend.businesses.model').BusinessSchema
        ProductSchema = importlib.import_module('backend.products.model').ProductSchema
        self.fields['user'] = ma.Nested(UserSchema, only=['id', 'first_name', 'last_name', 'email', 'contact'])
        self.fields['business'] = ma.Nested(BusinessSchema, only=['id', 'bus_name'])
        self.fields['product'] = ma.Nested(ProductSchema, only=['id', 'name', 'price', 'quantity'])
      