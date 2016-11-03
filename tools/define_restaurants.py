import requests

# Search Yelp for the top 100 restaurants
def get_best_restaurants(location, number):
    base_url = 'https://api.yelp.com/v2/search/'
    offset = 0
    requests.get(base_url, {'term': location, 'offset': offset, 'limit': 20})

# https://api.yelp.com/v2/search/?term=restaurant&location=University Ave, Palo Alto, CA
