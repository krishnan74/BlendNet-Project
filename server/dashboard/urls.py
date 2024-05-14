from django.urls import path
from . import views

urlpatterns = [
    path('getAllStocks/', views.getAllStocks, name='stocks'),
    path('getStockDetails/', views.getStockDetails, name='stock_details'),
    path('addToWatchList/', views.addToWatchList, name='add_stock'),
    path('getWatchList/', views.getWatchList, name='get_watch_list'),
    path('removeFromWatchList/', views.removeFromWatchList, name='remove_stock'),
    
]