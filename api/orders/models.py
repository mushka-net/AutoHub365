from django.db import models

class Order(models.Model):
    buyer = models.CharField()
    seller = models.CharField()
    car = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    app_label = 'orders'