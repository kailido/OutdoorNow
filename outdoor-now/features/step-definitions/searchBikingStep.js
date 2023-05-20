const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { assertThat, is, not, truthy, hasItems } = require('hamjest');
//import getHikingTrails from "../../../src/pages/api/getTrails/getHikingTrails";
const findUser = require("../../src/helpers/user/findUser");
const { createMocks, createRequest, createResponse } = require('node-mocks-http');
const getBikingTrails = require("../../src/pages/api/getTrails/getBikingTrails");
setDefaultTimeout(10000)
Given ('the user {string} exists', function (username) {
    
    this.user = findUser(username);
    
    assertThat(this.user, is(not(null)));
    
})

Given ('the user has {string} as one of their preferred activities', function (activity) {

    assertThat(this.user.favouriteActivities, is(not(undefined)));
    assertThat(this.user.favouriteActivities.includes(activity), is(true));

})

Given ("the user's profile has a preferred location set", function () {

    assertThat(this.user.homeLocation, is(not(undefined)));
    assertThat(this.user.homeLocation.lat, is(not(undefined)));
    assertThat(this.user.homeLocation.long, is(not(undefined)));

})

Given ("the user's profile has a valid radius set", function () {

    const radius = this.user.maxTravelRadius;
    assertThat(radius, is(not(undefined)));
    
    const myInteger = parseInt(radius);
    assertThat(Number.isInteger(myInteger), is(true));
})

When ("the user selects {string} as their preferred activity and selects search", async function (activity) {
   
    //mock status contain json object
   const request = createRequest({
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: {
        "activity": "biking",
        "lat": 48.468262,
        "lon": -123.306091,
        "radius": 25,
    },
  });

    const response = createResponse();

    //call getHikingTrails
    await getBikingTrails(request, response);

    this.resData = response._getData();
    //asserts that the response exists
    assertThat(this.resData, is(truthy()));
})

Then ("the system should return a list of biking trails within the radius around the user's preferred location", function () {

    assertThat(JSON.parse(this.resData), hasItems(
        {
        "name": "Mount Work - Hartland",
        "lat": "48.53378",
        "lon": "-123.45886",
        "difficulty": "",
        },
        {
        "name": "Canada Cup Trail",
        "lat": "48.47958",
        "lon": "-123.52315",
        "difficulty": "",
        },
        {  
        "name": "Canada Cup Trail",
        "lat": "48.47876",
        "lon": "-123.53295",
        "difficulty": "",
        },
        {
        "name": "Gowlland Tod Provincial Park",
        "lat": "48.54198",
        "lon": "-123.52375",
        "difficulty": "",
      
        }
    ))

})



