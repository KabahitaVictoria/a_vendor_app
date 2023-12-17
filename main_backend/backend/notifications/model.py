# Represents notifications sent to users or businesses regarding orders, updates, or other events.
from backend.db import db, ma

class Notification(db.Model):
   __tablename__ = "notification"
   id = db.Column(db.Integer, primary_key = True)
   description = db.Column(db.String(100), unique = False)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   businesses_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
   
class NotificationSchema(ma.SQLAlchemyAutoSchema):
   class Meta:
      model = Notification
      load_instance = True
      