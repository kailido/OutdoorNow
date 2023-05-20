/* 
This API takes a location (in latitude and longitude) and a radius (in kilometers), 
and returns a list of hiking trails within the given radius.
*/

const fetchWrapper = require("../../../helpers/fetchWrapper");
const haversine = require("../../../helpers/haversine");

async function getHikingTrails(request, response){
    
    var lat
    var lon
    var radius
    if(typeof(request.body) == "string"){
        const data = JSON.parse(request.body);
        lat = data.lat;
        lon = data.lon;
        radius = data.radius;
    }else{
        lat = request.body.lat;
        lon = request.body.lon;
        radius = request.body.radius;
    }

    var output = [];

    const headers = {
        'X-RapidAPI-Key' : '',
        'X-RapidAPI-Host' : 'trailapi-trailapi.p.rapidapi.com'
    };
    
    //get activities from mocked trail api response
    var trails = await fetchWrapper.get(`https://trailapi-trailapi.p.rapidapi.com/activity/?lat=${lat}&limit=100&lon=${lon}&radius=35`, headers);

    //iterate through the returned locations
    for (const key in trails) {
        
        //loop through the activities of each location
        for (const activity in trails[key].activities) {
            //if the location has hiking trails, add it to the output
            if (activity == "hiking") {
                
                //find distance between user and trail using haversine
                let distance = haversine(lat, lon, trails[key].lat, trails[key].lon);
                
                //round the distance to one decimal place
                distance = distance.toFixed(1);
                
                //if the trail is within the user's max radius, add it to the output
                if (distance <= radius){
                    //trail objects added to the output include a name, lat, lon, and distance from the user
                    output.push({"name":trails[key].name,
                    "lat":trails[key].lat,
                    "lon":trails[key].lon,
                    "distance":distance});
                }
            }
        }
    }
    response.status(200).json(output);
}

module.exports = getHikingTrails