import re #for regex

def getDieselPrice() :
    with open("diesel.html", "r") as file : #open the file as file
        data = file.read() #read the content in the file

    pattern = r'₹(\d+\.\d{2})' #regex to match the first occurance
    match = re.search(pattern, data) #try to find a match for the regex pattern

    price = None
    if match :
        price = match.group(1)
    else :
        print("No match found")

    if price :
        with open("diesel_price.txt", "w") as p :
            p.write(price)
