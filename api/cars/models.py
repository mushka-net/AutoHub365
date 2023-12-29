from mongoengine import *

class Car(Document):
    user_id = StringField(required=True)
    brand = StringField(required=True)
    model = StringField(required=True)
    year = IntField(required=True)
    color = StringField(required=True)
    price = IntField(required=True)
    mileage = IntField(required=True)
    engine_capacity = FloatField(required=True)
    engine_type = StringField(required=True)
    transmission_type = StringField(required=True)
    description = StringField(required=True)
    image = FileField(required=True)
    is_sold = BooleanField(required=True)
