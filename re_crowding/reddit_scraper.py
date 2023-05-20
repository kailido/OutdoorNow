import requests
import json
import praw

# Connect to the Pushshift API
url = "https://api.pushshift.io/reddit/search/submission"

# Set the parameters for the API call
params = {
    "subreddit": "VictoriaBC",
    "q": "activities|activity",
    #"sort": "desc",
    "size": 1000
}

# Make the API call
response = requests.get(url, params=params)

# Get the JSON data from the response
data = json.loads(response.text)

# Connect to Reddit using PRAW
"""
reddit = praw.Reddit(client_id="jezuYA0_jxdcoCeqzfBwLw",
                     client_secret="29o8LlBznR8YBKzYbq5l7i-p42xqew",
                     user_agent="test_bot12345s")
"""


# Iterate through the posts and print the title and score

for post in data["data"]:
    print(post["title"])
    print(post["selftext"])
    print(post["url"])
    #print("Title:", submission.title)
    #print("Score:", submission.score)
    print("---")