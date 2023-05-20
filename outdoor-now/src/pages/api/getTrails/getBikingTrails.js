const { fetchWrapper } = require("../../../helpers/fetchWrapper");
const haversine = require("../../../helpers/haversine");

async function getBikingTrails(request, response){
    
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
    const trails = await fetchWrapper.get(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lon}&radius=35`, headers);
    for (var trail of trails.data) {
        //find distance between user and trail using haversine
        let distance = haversine(lat, lon, trail.lat, trail.lon);
        
        //round the distance to one decimal place
        distance = distance.toFixed(1);
        //if the trail is within the user's max radius, add it to the output
        if (distance <= radius){
            //trail objects added to the output include a name, lat, lon, and distance from the user
            output.push({
                "name":trail.name,
                "lat":trail.lat,
                "lon":trail.lon,
                "difficulty": trail.difficulty,
            });
        }
    }


    response.status(200).json(output);
}

module.exports = getBikingTrails;