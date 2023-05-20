import getHikingTrails from "../../src/pages/api/getTrails/getHikingTrails";
import findUser from '../../src/helpers/user/findUser';

//tests getHikingTrails API which makes a call to the Trail API and filters results based on activity and radius 
test("getHikingTrails API should return certain activities when the API is called", async () => {
    
    
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //gathers user data using findUser 
    const user = "testAdminUser123";
    const result = findUser(user);

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

    await getHikingTrails(request, response);

    //expected response contains locartions wuth hiking trails within 20km radius around user location
    expect(json.mock.calls[0][0]).toMatchObject([
        {
          name: 'Lime Kiln Point State Park',
          lat: '48.5156',
          lon: '-123.1492',
          distance: '13.6'
        },
        {
          name: 'Discovery Island Marine Provincial Park',
          lat: '48.4548',
          lon: '-123.2661',
          distance: '5.2'
        },
        {
          name: 'Goldstream Provincial Park',
          lat: '48.4709',
          lon: '-123.5521',
          distance: '16.8'
        },
        {
          name: 'Gowlland Tod Provincial Park',
          lat: '48.5420',
          lon: '-123.5237',
          distance: '16.2'
        },
        {
          name: 'John Dean Provincial Park',
          lat: '48.6136',
          lon: '-123.4450',
          distance: '17.4'
        }
      ]
    );
    
});