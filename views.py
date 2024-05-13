from django.shortcuts import render
from django.http import JsonResponse
import requests


# Create your views here.
def getAllStocks(request):
    #accept json

    keyword = request.GET.get('keyword')

    url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={}&apikey=demo'.format(keyword)
    r = requests.get(url)
    response = r.json()['bestMatches']
    
    return JsonResponse(response,safe=False)


def getStockDetails(request):
    #accept json

    symbol = request.GET.get('symbol')

    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={}&apikey=demo'.format(symbol)
    r = requests.get(url)
    
    return JsonResponse(r.json(),safe=False)