from mongoengine import *

class PersonalInfo(Document):
    user_id = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    sex = StringField(required=True)
    phone = StringField(required=True)
    city = StringField(required=True)
    country = StringField(required=True)