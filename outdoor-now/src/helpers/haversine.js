// code help from https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript

//function claculates the distance between two coordinate points
function haversine(user_lat, user_lon, trail_lat, trail_lon) {
    
    // convert user and trail lat to radians
    const user_lat_rad = user_lat * Math.PI / 180;
    const trail_lat_rad = trail_lat * Math.PI / 180;

    var R = 6378; // km (radius of the earth)
    var x1 = trail_lat - user_lat;
    var dLat = x1* Math.PI / 180;
    var x2 = trail_lon - user_lon;
    var dLon = x2* Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(user_lat_rad) * Math.cos(trail_lat_rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

module.exports = haversine;