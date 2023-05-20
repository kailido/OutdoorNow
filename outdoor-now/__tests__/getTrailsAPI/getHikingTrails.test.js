// Description: This file contains tests for the getHikingTrails API
//import getHikingTrails to test and findUser for user data
const getHikingTrails = require("../../src/pages/api/getTrails/getHikingTrails");
const findUser = require('../../src/helpers/user/findUser');
//import fetchWrapper to mock
const fetchWrapper = require("../../src/helpers/fetchWrapper");
//mock fetchWeather
jest.mock("../../src/helpers/fetchWrapper");

//tests whether the getHikingTrails API returns a response
/* test("getHikingTrails API should return a response", async () => {

    //mock json object
    const json = jest.fn();
    //mock status contain json object
    const status = jest.fn(() => {
        return {json}
    });    
    //build response object
    const response = {status};
    //create request object
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "username": "test",
            "lat": 48.468262,
            "lon": -123.306091,
            "radius": 1000,
        })
    }
    
    fetchWrapper.get.mockImplementation(() => {

        return ({"19890": {
              "name": "Bamberton Provincial Park",
              "city": "Mill Bay",
              "state": "British Columbia",
              "country": "Canada"
             
            }
        });

    });

    //create request objects
    getHikingTrails(request, response);
    //expect json to be called once
    expect(json.mock.calls).toHaveLength(1);
}); */

//function mock fetch get and returns a list of hiking trails
test("getHikingTrails API should return a list of hiking trails", async () => {

    //mock json object
    const json = jest.fn();
    //mock status contain json object
    const status = jest.fn(() => {
        return {json}
    });    
    //build response object
    const response = {status};
    //create request object
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "state": "British Columbia",
            "lat": 48.468262,
            "lon": -123.306091,
            "radius": 1000,
        })
    }

    
    //mock fetchWrapper
    fetchWrapper.get.mockImplementation(() => {
        //mock trail api response
        return ({"19890": {
              "name": "Bamberton Provincial Park",
              "city": "Mill Bay",
              "state": "British Columbia",
              "country": "Canada",
              "description": "A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.",
              "directions": "The park is located on southern Vancouver Island, approximately 45 km north of Victoria off Highway 1. Turn east off Highway 1 onto Mill Bay Road, near the north end of the scenic Malahat Drive. BC Ferries offers service from Mill Bay to Brentwood Bay, a distance of 8 km by sea with a crossing time of 25 minutes. Bamberton Park is located a 5-minute drive south of Mill Bay. Nearby communities include: Mill Bay, Shawnigan Lake, Cobble Hill, Duncan, Victoria.",
              "lat": "48.6041",
              "lon": "-123.5272",
              "parent_id": "0",
              "place_id": "19890",
              "activities": {
                "hiking": {
                  "url": "http://www.tripleblaze.com/trail.php?c=3&i=6325",
                  "length": "0",
                  "description": "A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.",
                  "name": "Bamberton Provincial Park",
                  "rank": "0",
                  "rating": "0.00",
                  "thumbnail": "",
                  "activity_type": "2",
                  "activity_type_name": "hiking",
                  "attribs": {
                    "length": "0"
                  },
                  "place_activity_id": "951753"
                },
                "camping": {
                  "url": "http://www.tripleblaze.com/trail.php?c=2&i=9539",
                  "length": "3",
                  "description": "For years the warm waters surrounding Vancouver Island's Mill Bay have been a popular destination for local salmon fishers. The inviting water and the 225-metre long sandy beach have also made nearby Bamberton Provincial Park an ideal spot for parents to bring their families. While the kids frolic in the warm waves, parents can lounge in the sand and enjoy the views across the inlet - to the east are the shores of the Saanich Peninsula, with the southern Gulf Islands and Mt. Baker beyond. Rising sharply to the west are the mountains of south Vancouver Island.",
                  "name": "Bamberton Provincial Park",
                  "rank": "0",
                  "rating": "0.00",
                  "thumbnail": "",
                  "activity_type": "6",
                  "activity_type_name": "camping",
                  "attribs": {
                    "length": "3"
                  },
                  "place_activity_id": "961795"
                }
              }
            }
        })

    });
    
    //call getHikingTrails
    await getHikingTrails(request, response);

    //mock similar object
    //make sure the activity type is hiking
    expect(json.mock.calls[0][0]).toMatchObject([
        {
            "name": "Bamberton Provincial Park",
            }
    ]);
});

// filters out locations that do not have hiking trails
test("getHikingTrails API should return locations with hiking only", async () => {

    //mock json object
    const json = jest.fn();
    //mock status contain json object
    const status = jest.fn(() => {
        return {json}
    });    
    //build response object
    const response = {status};
    //create request object
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "activity": "hiking",
            "state": "British Columbia",
            "lat": 48.468262,
            "lon": -123.306091,
            "radius": 1000,
        })
    }

    
    //mock fetchWrapper
    fetchWrapper.get.mockImplementation(() => {
        //mock response with some locations without hiking trails
        return ({"19890": {
            "name": "Bamberton Provincial Park",
            "city": "Mill Bay",
            "state": "British Columbia",
            "country": "Canada",
            "description": "A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.",
            "directions": "The park is located on southern Vancouver Island, approximately 45 km north of Victoria off Highway 1. Turn east off Highway 1 onto Mill Bay Road, near the north end of the scenic Malahat Drive. BC Ferries offers service from Mill Bay to Brentwood Bay, a distance of 8 km by sea with a crossing time of 25 minutes. Bamberton Park is located a 5-minute drive south of Mill Bay. Nearby communities include: Mill Bay, Shawnigan Lake, Cobble Hill, Duncan, Victoria.",
            "lat": "48.6041",
            "lon": "-123.5272",
            "parent_id": "0",
            "place_id": "19890",
            "activities": {
              "camping": {
                "url": "http://www.tripleblaze.com/trail.php?c=2&i=9539",
                "length": "3",
                "description": "For years the warm waters surrounding Vancouver Island's Mill Bay have been a popular destination for local salmon fishers. The inviting water and the 225-metre long sandy beach have also made nearby Bamberton Provincial Park an ideal spot for parents to bring their families. While the kids frolic in the warm waves, parents can lounge in the sand and enjoy the views across the inlet - to the east are the shores of the Saanich Peninsula, with the southern Gulf Islands and Mt. Baker beyond. Rising sharply to the west are the mountains of south Vancouver Island.",
                "name": "Bamberton Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "6",
                "activity_type_name": "camping",
                "attribs": {
                  "length": "3"
                },
                "place_activity_id": "961795"
              }
            }
          },
          "19902": {
            "name": "Bellhouse Provincial Park",
            "city": "Galiano Island",
            "state": "British Columbia",
            "country": "Canada",
            "description": "Bellhouse Provincial Park is a day-use park on Galiano Island Located on Burril Point, this park offers hiking, canoeing, kayaking and fishing for visitors to enjoy!",
            "directions": "Bellhouse Provincial Park is located 1 km west of Sturdies Bay on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). Once on Galiano head north on Sturdies Bay Road, turn left Burrill Road, then left again on Jack Road until you reach the park.",
            "lat": "48.8731",
            "lon": "-123.3143",
            "parent_id": "0",
            "place_id": "19902",
            "activities": {
              "hiking": {
                "url": "http://www.tripleblaze.com/trail.php?c=3&i=5831",
                "length": "0",
                "description": "Bellhouse Provincial Park is a day-use park on Galiano Island Located on Burril Point, this park offers hiking, canoeing, kayaking and fishing for visitors to enjoy!",
                "name": "Bellhouse Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "2",
                "activity_type_name": "hiking",
                "attribs": {
                  "length": "0"
                },
                "place_activity_id": "951255"
              }
            }
          },
          "19922": {
            "name": "Bodega Ridge Provincial Park",
            "city": "Galiano Island",
            "state": "British Columbia",
            "country": "Canada",
            "description": "A 4 km trail through the park is accessible via Cottage Way. This trail leads uphill along the top of Bodega Ridge, through the forested area and along the cliff edge, ending at the northern boundary of the park. A large portion of this hike is uphill with the remaining portion adjacent to the cliff edge. The top of the ridge can be reached in approximately 30 minutes. Please stay on designated trail and away from cliff edge. Please respect vegetation in the area as it is sensitive to human disturbance.",
            "directions": "Bodega Ridge Provincial Park is located on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). The park is situated approximately three-quarters of the way along the island from the ferry terminal and is accessible by Cottage Way from Porlier Pass Road.",
            "lat": "48.9575",
            "lon": "-123.5411",
            "parent_id": "0",
            "place_id": "19922",
            "activities": {
              "hiking": {
                "url": "http://www.tripleblaze.com/trail.php?c=3&i=6985",
                "length": "4",
                "description": "A 4 km trail through the park is accessible via Cottage Way. This trail leads uphill along the top of Bodega Ridge, through the forested area and along the cliff edge, ending at the northern boundary of the park. A large portion of this hike is uphill with the remaining portion adjacent to the cliff edge. The top of the ridge can be reached in approximately 30 minutes. Please stay on designated trail and away from cliff edge. Please respect vegetation in the area as it is sensitive to human disturbance.",
                "name": "Bodega Ridge Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "2",
                "activity_type_name": "hiking",
                "attribs": {
                  "length": "4"
                },
                "place_activity_id": "952392"
              }
            }
          },
          "19938": {
            "name": "Bright Angel Park",
            "city": "Cowichan",
            "state": "British Columbia",
            "country": "Canada",
            "description": "Bright Angel Park offers plenty of opportunities for outdoor lovers in British Columbia. There are plenty of winding trails through the woods here so hiking and trail running are not in short supply. Other activities include swimming, canoeing, boating, kayaking and camping.",
            "directions": "Head west off of Trans-Canada Highway onto Koksilah Rd. and take a right onto Tigwell Rd.",
            "lat": "48.7332",
            "lon": "-123.6857",
            "parent_id": "0",
            "place_id": "19938",
            "activities": {
              "camping": {
                "url": "http://www.tripleblaze.com/trail.php?c=2&i=9172",
                "length": "3",
                "description": "Bright Angel Park offers plenty of opportunities for outdoor lovers in British Columbia. There are plenty of winding trails through the woods here so hiking and trail running are not in short supply. Other activities include swimming, canoeing, boating, kayaking and camping.",
                "name": "Bright Angel Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "6",
                "activity_type_name": "camping",
                "attribs": {
                  "length": "3"
                },
                "place_activity_id": "961437"
              }
            }
          },

        });
    });

    //call getHikingTrails
    await getHikingTrails(request, response);

    //should only include the locations with hiking as an activity
    expect(json.mock.calls[0][0]).toMatchObject([
        {
            "name": "Bellhouse Provincial Park",
            "lat": "48.8731",
            "lon": "-123.3143"},
        {
            "name": "Bodega Ridge Provincial Park",
            "lat": "48.9575",
            "lon": "-123.5411"}
        
    ]);
          
});


//grabs lat and lon from the user and compares it to the returned trail
test("getHikingTrails API uses haversine to find trail distance from user", async () => {

    //mock json object
    const json = jest.fn();
    //mock status contain json object
    const status = jest.fn(() => {
        return {json}
    });    
    //build response object
    const response = {status};
    
    //gethers user data using findUser 
    const user = "testAdminUser123";
    const result = findUser(user);
    
    //console.log(result);

    //build request object using user data
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "lat": result.homeLocation.lat,
            "lon": result.homeLocation.long,
            "radius": result.maxTravelRadius,
        })
    }
    //mock fetchWrapper
    fetchWrapper.get.mockImplementation(() => {
        
        //mock trail api response, changed coordinates from (48.6041, -123.5272) 
        //to 48.47917293604235, -123.3254259732314 (same as user) to get expected distance of 0
        return ({"19890": {
              "name": "Bamberton Provincial Park",
              "city": "Mill Bay",
              "state": "British Columbia",
              "country": "Canada",
              "description": "A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.",
              "directions": "The park is located on southern Vancouver Island, approximately 45 km north of Victoria off Highway 1. Turn east off Highway 1 onto Mill Bay Road, near the north end of the scenic Malahat Drive. BC Ferries offers service from Mill Bay to Brentwood Bay, a distance of 8 km by sea with a crossing time of 25 minutes. Bamberton Park is located a 5-minute drive south of Mill Bay. Nearby communities include: Mill Bay, Shawnigan Lake, Cobble Hill, Duncan, Victoria.",
              "lat": "48.47917293604235",
              "lon": "-123.3254259732314",
              "parent_id": "0",
              "place_id": "19890",
              "activities": {
                "hiking": {
                  "url": "http://www.tripleblaze.com/trail.php?c=3&i=6325",
                  "length": "0",
                  "description": "A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.",
                  "name": "Bamberton Provincial Park",
                  "rank": "0",
                  "rating": "0.00",
                  "thumbnail": "",
                  "activity_type": "2",
                  "activity_type_name": "hiking",
                  "attribs": {
                    "length": "0"
                  },
                  "place_activity_id": "951753"
                },
                "camping": {
                  "url": "http://www.tripleblaze.com/trail.php?c=2&i=9539",
                  "length": "3",
                  "description": "For years the warm waters surrounding Vancouver Island's Mill Bay have been a popular destination for local salmon fishers. The inviting water and the 225-metre long sandy beach have also made nearby Bamberton Provincial Park an ideal spot for parents to bring their families. While the kids frolic in the warm waves, parents can lounge in the sand and enjoy the views across the inlet - to the east are the shores of the Saanich Peninsula, with the southern Gulf Islands and Mt. Baker beyond. Rising sharply to the west are the mountains of south Vancouver Island.",
                  "name": "Bamberton Provincial Park",
                  "rank": "0",
                  "rating": "0.00",
                  "thumbnail": "",
                  "activity_type": "6",
                  "activity_type_name": "camping",
                  "attribs": {
                    "length": "3"
                  },
                  "place_activity_id": "961795"
                }
              }
            }
        })

    });

    //call getHikingTrails
    await getHikingTrails(request, response);

    //should exclude the locations without hiking as an activity
    expect(json.mock.calls[0][0]).toMatchObject([
        {
            "name": "Bamberton Provincial Park",
            "lat": "48.47917293604235",
            "lon": "-123.3254259732314",
            "distance": "0.0"},
    ]);
});


//finds the distance between the user and each trail and compares it to the user's preferred radius
test("getHikingTrails API returns hiking trails within the user's max radius", async () => {

    //mock json object
    const json = jest.fn();
    //mock status contain json object
    const status = jest.fn(() => {
        return {json}
    });    
    //build response object
    const response = {status};
    
    //gethers user data using findUser 
    const user = "testAdminUser123";
    const result = findUser(user);

    //build request object using the user lat and lon
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "activity": "hiking",
            "state": "British Columbia",
            "lat": result.homeLocation.lat,
            "lon": result.homeLocation.long,
            "radius": result.maxTravelRadius,
        })
    }
    fetchWrapper.get.mockImplementation(() => {
        //mock response with some locations without hiking trails
        return ({"19890": {
            "name": "Bamberton Provincial Park",
            "city": "Mill Bay",
            "state": "British Columbia",
            "country": "Canada",
            "lat": "48.5041",
            "lon": "-123.4272",
            "activities": {
              "hiking": {
                "url": "http://www.tripleblaze.com/trail.php?c=2&i=9539",
                "length": "3",
                "description": "For years the warm waters surrounding Vancouver Island's Mill Bay have been a popular destination for local salmon fishers. The inviting water and the 225-metre long sandy beach have also made nearby Bamberton Provincial Park an ideal spot for parents to bring their families. While the kids frolic in the warm waves, parents can lounge in the sand and enjoy the views across the inlet - to the east are the shores of the Saanich Peninsula, with the southern Gulf Islands and Mt. Baker beyond. Rising sharply to the west are the mountains of south Vancouver Island.",
                "name": "Bamberton Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "6",
                "activity_type_name": "camping",
                "attribs": {
                  "length": "3"
                },
                "place_activity_id": "961795"
              }
            }
          },
          "19902": {
            "name": "Bellhouse Provincial Park",
            "city": "Galiano Island",
            "state": "British Columbia",
            "country": "Canada",
            "description": "Bellhouse Provincial Park is a day-use park on Galiano Island Located on Burril Point, this park offers hiking, canoeing, kayaking and fishing for visitors to enjoy!",
            "directions": "Bellhouse Provincial Park is located 1 km west of Sturdies Bay on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). Once on Galiano head north on Sturdies Bay Road, turn left Burrill Road, then left again on Jack Road until you reach the park.",
            "lat": "48.8731",
            "lon": "-123.3143",
            "parent_id": "0",
            "place_id": "19902",
            "activities": {
              "hiking": {
                "url": "http://www.tripleblaze.com/trail.php?c=3&i=5831",
                "length": "0",
                "description": "Bellhouse Provincial Park is a day-use park on Galiano Island Located on Burril Point, this park offers hiking, canoeing, kayaking and fishing for visitors to enjoy!",
                "name": "Bellhouse Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "2",
                "activity_type_name": "hiking",
                "attribs": {
                  "length": "0"
                },
                "place_activity_id": "951255"
              }
            }
          },
          "19922": {
            "name": "Bodega Ridge Provincial Park",
            "city": "Galiano Island",
            "state": "British Columbia",
            "country": "Canada",
            "description": "A 4 km trail through the park is accessible via Cottage Way. This trail leads uphill along the top of Bodega Ridge, through the forested area and along the cliff edge, ending at the northern boundary of the park. A large portion of this hike is uphill with the remaining portion adjacent to the cliff edge. The top of the ridge can be reached in approximately 30 minutes. Please stay on designated trail and away from cliff edge. Please respect vegetation in the area as it is sensitive to human disturbance.",
            "directions": "Bodega Ridge Provincial Park is located on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). The park is situated approximately three-quarters of the way along the island from the ferry terminal and is accessible by Cottage Way from Porlier Pass Road.",
            "lat": "48.4575",
            "lon": "-123.3411",
            "parent_id": "0",
            "place_id": "19922",
            "activities": {
              "hiking": {
                "url": "http://www.tripleblaze.com/trail.php?c=3&i=6985",
                "length": "4",
                "description": "A 4 km trail through the park is accessible via Cottage Way. This trail leads uphill along the top of Bodega Ridge, through the forested area and along the cliff edge, ending at the northern boundary of the park. A large portion of this hike is uphill with the remaining portion adjacent to the cliff edge. The top of the ridge can be reached in approximately 30 minutes. Please stay on designated trail and away from cliff edge. Please respect vegetation in the area as it is sensitive to human disturbance.",
                "name": "Bodega Ridge Provincial Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "2",
                "activity_type_name": "hiking",
                "attribs": {
                  "length": "4"
                },
                "place_activity_id": "952392"
              }
            }
          },
          "19938": {
            "name": "Bright Angel Park",
            "city": "Cowichan",
            "state": "British Columbia",
            "country": "Canada",
            "description": "Bright Angel Park offers plenty of opportunities for outdoor lovers in British Columbia. There are plenty of winding trails through the woods here so hiking and trail running are not in short supply. Other activities include swimming, canoeing, boating, kayaking and camping.",
            "directions": "Head west off of Trans-Canada Highway onto Koksilah Rd. and take a right onto Tigwell Rd.",
            "lat": "48.7332",
            "lon": "-123.6857",
            "parent_id": "0",
            "place_id": "19938",
            "activities": {
              "camping": {
                "url": "http://www.tripleblaze.com/trail.php?c=2&i=9172",
                "length": "3",
                "description": "Bright Angel Park offers plenty of opportunities for outdoor lovers in British Columbia. There are plenty of winding trails through the woods here so hiking and trail running are not in short supply. Other activities include swimming, canoeing, boating, kayaking and camping.",
                "name": "Bright Angel Park",
                "rank": "0",
                "rating": "0.00",
                "thumbnail": "",
                "activity_type": "6",
                "activity_type_name": "camping",
                "attribs": {
                  "length": "3"
                },
                "place_activity_id": "961437"
              }
            }
          },

        });
    });

    //call getHikingTrails
    await getHikingTrails(request, response);

    //should exclude the locations without hiking as an activity
    expect(json.mock.calls[0][0]).toMatchObject([
        {
            "name": "Bamberton Provincial Park",
            "lat": "48.5041",
            "lon": "-123.4272",
            "distance": "8.0"},
        {
            "name": "Bodega Ridge Provincial Park",
            "lat": "48.4575",
            "lon": "-123.3411",
            "distance": "2.7"},
    ]);
});



