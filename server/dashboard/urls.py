from django.urls import path
from . import views

urlpatterns = [
    path('getAllStocks/', views.getAllStocks, name='stocks'),
    path('getStockDetails/', views.getStockDetails, name='stock_details'),
]