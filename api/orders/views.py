from orders.models import Order
from orders.serializers import OrderSerializer, OrderDetailSerializer
from cars.models import Car

from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework_mongoengine import generics
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

class OrderViewSet(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        seller = self.request.query_params.get('seller', None)
        buyer = self.request.query_params.get('buyer', None)
        if seller is not None:
            queryset = queryset.filter(seller=seller)
        if buyer is not None:
            queryset = queryset.filter(buyer=buyer)
        return queryset

    def create(self, request, *args, **kwargs):
        car_id = request.data['car']
        if Car.objects.filter(id=car_id).count() == 0:
            raise NotFound("Car with id {} does not exist.".format(car_id))
        car = Car.objects.get(id=car_id)
        request.data['buyer'] = request.auth.user.id
        request.data['seller'] = str(car.user_id)
        if car.is_sold:
            raise PermissionDenied("This car is already sold.")
        if int(request.auth.user.id) == int(car.user_id):
            raise PermissionDenied("You cannot buy your own car.")
        Car.objects(id=car_id).update(is_sold=True)
        return super(OrderViewSet, self).create(request, *args, **kwargs)

class OrderDetailViewSet(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    lookup_field = 'id'
