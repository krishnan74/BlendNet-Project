
from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from bson.objectid import ObjectId


uri = "mongodb+srv://divyakrishnanr74:9bJkpwcwsAgEI495@cluster0.6lceo7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)

@csrf_exempt
def addWatchList(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        current_user_id = request.GET.get('userid')
        
        stock_to_add = data.get('stockToBeAdded')

        database = client.get_database("user_db")
        users = database.get_collection("users")

        current_user = users.find_one({"_id" : ObjectId(current_user_id)})

        print(current_user)

        if current_user:
            print("entering")
            watch_list = current_user.get('watch_list', [])
            for stock in stock_to_add:
                watch_list.append(stock)
            
            users.update_one({"_id": ObjectId(current_user_id)}, {"$set": {"watch_list": watch_list}})
            return JsonResponse({"message": "Stock added to watchlist"})
        
        return JsonResponse({"error": "User not found"})


        
    except Exception as e:
        return JsonResponse({"error": str(e)})
    

def getWatchList(request):
    try:
        current_user_id = request.GET.get('userid')
        
        database = client.get_database("user_db")
        users = database.get_collection("users")

        current_user = users.find_one({"_id" : ObjectId(current_user_id)})

        if current_user:
            watch_list = current_user.get('watch_list', [])
            return JsonResponse({"watch_list": watch_list})

        return JsonResponse({"error": "User not found"})

    except Exception as e:
        return JsonResponse({"error": str(e)})
    

# Create your views here.
def getAllStocks(request):
    #accept json

    keyword = request.GET.get('keyword')

    url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={}&apikey=demo'.format(keyword)
    r = requests.get(url)
    response = r.json()
    
    return JsonResponse(response,safe=False)


def getStockDetails(request):
    #accept json

    symbol = request.GET.get('symbol')

    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={}&apikey=demo'.format(symbol)
    r = requests.get(url)
    
    return JsonResponse(r.json(),safe=False)