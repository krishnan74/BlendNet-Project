from django.shortcuts import render
from pymongo import MongoClient
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

uri = "mongodb+srv://divyakrishnanr74:9bJkpwcwsAgEI495@cluster0.6lceo7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)

@csrf_exempt
def login(request):

    data = request.POST
    username = data['username']
    password = data['password']

    database = client.get_database("user_db")
    users = database.get_collection("users")

    try:
        user = users.find_one({
            "username": username,
        })

        userid = str(user['_id'])

        if(user['password'] == password):
            return JsonResponse({
                "message": "Login successful", 
                "userid": userid
            })
        else:
            return JsonResponse({
                "message": "Invalid password"
            })

    except Exception as e:
        return JsonResponse({
            "error": "Invalid username"
        })
   
@csrf_exempt
def register(request):
    
    data = request.POST

    username = data['username']
    email = data['email']
    password = data['password']

    database = client.get_database("user_db")
    users = database.get_collection("users")

    try:
        user = users.insert_one({
            "username": username,   
            "email": email,
            "password": password,
            "watch_list": ['IBM', 'MSFT'],
        })

        return JsonResponse({
            "message": "User registered",
            "userid": str(user.inserted_id)
        })

    except Exception as e:
        return JsonResponse({
            "error": "Username already exists"
        })