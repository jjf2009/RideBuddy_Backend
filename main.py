from dotenv import load_dotenv
import os
import requests
import exPetrol
import exDiesel

load_dotenv()

petrol_url = os.getenv("petrol_url")
diesel_url = os.getenv("diesel_url")

def fetchAndSave(url, path):
    response = requests.get(url) #get the html contetnt using the get reuquest
    with open(path, "w") as f : #open a file in write mode to save the html contetnt
        f.write(response.text) #save the contetnt in the desired file

fetchAndSave(petrol_url, "petrol.html")
fetchAndSave(diesel_url, "diesel.html")

exPetrol.getPetrolPrice()
exDiesel.getDieselPrice()

print("successfull")
