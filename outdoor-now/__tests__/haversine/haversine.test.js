// Tests haversine function that calculates the distance between two points
// and compares the distance to the user's max radius

//import haversine and findUser functions from helpers
import haversine from "../../src/helpers/haversine";
import findUser from '../../src/helpers/user/findUser';

test('haversine calculates distance correctly', () => {

    //const data for user and trail coordinates
    const user_lat = 48.468262;
    const user_lon = -123.306091;
    const trail_lat = 48.9575;
    const trail_lon = -123.5411;
    
    const expectedDistance = 57.09; //km

    //how many km away is (48.468262, -123.306091) from (48.9575, -123.5411
    const distance = haversine(user_lat, user_lon, trail_lat, trail_lon);
    //compares values to 0 decimal places
    expect(distance).toBeCloseTo(expectedDistance, 0);

});


test('gathers and compares user coordinates and radius to trail location', () => {

    //get user data using findUser
    const user = "testAdminUser123";
    const result = findUser(user);
    
    //extract user data and set to variables
    //user coordinates = (48.47917293604235, -123.3254259732314) and radius of 10km
    const user_lat = result.homeLocation.lat;
    const user_lon = result.homeLocation.long;
    const maxRadius = result.maxTravelRadius;
    //sample trail location
    const trail_lat = 48.4575;
    const trail_lon = -123.3411;
    
    //how many km away is (48.468262, -123.306091) from (48.9575, -123.5411
    const distance = haversine(user_lat, user_lon, trail_lat, trail_lon);
    
    //compares values to 0 decimal places
    expect(distance).toBeLessThanOrEqual(maxRadius);

});



