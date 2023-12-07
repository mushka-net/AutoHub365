from mongoengine import *

class PersonalInfo(Document):
    user_id = StringField(required=True, unique=True)
    first_name = StringField(required=True, default=" ")
    last_name = StringField(required=True, default=" ")
    sex = StringField(required=True, default=" ")
    phone = StringField(required=True, default=" ")
    email = StringField(required=True, default=" ")
    city = StringField(required=True, default=" ")
