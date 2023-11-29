import mongoengine
MONGO_USER = 'user'
MONGO_PASS = 'pass'
MONGO_HOST = '127.0.0.1'
MONGO_PORT = 27017
MONGO_NAME = 'autohub365'
CONNECTION_STRING = "mongodb://user:pass@localhost:27017/autohub365?authMechanism=DEFAULT"

MONGO_DATABASE_HOST = "mongodb://%s:%s@%s/%s" % (MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_NAME)

mongoengine.connect(host=CONNECTION_STRING, authentication_source='admin')
#mongoengine.connect(MONGO_NAME, host=MONGO_DATABASE_HOST)

# create a new document
class Car(mongoengine.Document):
    brand = mongoengine.StringField(required=True)
    model = mongoengine.StringField(required=True)
    year = mongoengine.IntField(required=True)
    color = mongoengine.StringField(required=True)
    price = mongoengine.IntField(required=True)
    engineCapacity = mongoengine.IntField(required=True)
    engineType = mongoengine.StringField(required=True)
    transmissionType = mongoengine.StringField(required=True)
    description = mongoengine.StringField(required=True)
    image = mongoengine.StringField(required=True)

# create a collection in the database
Car.objects.create(brand='Toyota', model='Camry', year=2018, color='Black', price=1000000, engineCapacity=2.5, engineType='Petrol', transmissionType='Automatic', description='A very clean car', image='https://autohub365.com/wp-content/uploads/2021/08/Toyota-Camry-2018-1.jpg')
Car.objects.create(brand='Toyota', model='Corolla', year=2018, color='Black', price=1000000, engineCapacity=2.5, engineType='Petrol', transmissionType='Automatic', description='A very clean car', image='https://autohub365.com/wp-content/uploads/2021/08/Toyota-Camry-2018-1.jpg')

# retrieve all documents in the collection
Car.objects.all()

