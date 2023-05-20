const { Given, When, Then, AfterAll} = require('@cucumber/cucumber')
const signUp = require('../../src/pages/api/user/signUp');
const findUser = require('../../src/helpers/user/findUser');
const { assertThat,is,not, hasItem, contains} = require('hamjest');
const { createMocks, createRequest, createResponse, body} = require('node-mocks-http');
const login = require('../../src/pages/api/user/login');
const getHikingTrails = require("../../src/pages/api/getTrails/getHikingTrails");
const reverseGeocode = require('../../src/helpers/googleAPI/reverseGeocode')
const createPlan = require('../../src/pages/api/plan/createPlan');
const readJSON = require('../../src/helpers/JSON_utils/readJSON')
const writeJSON = require('../../src/helpers/JSON_utils/writeJSON')

Given('the user {string} has signed up and logged in', function (user) {
  
  //User has signed up
  const result = findUser(user);
  assertThat(result,is(not(null)));
  this.username = user;
  //then login in:
  const login_request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"username": "testAdminUser123",
        "password": "test_Password.1770"})
    }

  const response = createResponse();
  //call login with req and res

  login(login_request, response);
   //request logs in a specific user in users.json
   

  assertThat(response.statusCode, is(200));
})

Given('{string} is selected as the activity', function (activity) {
  this.selected_activity = activity
  this.userData = findUser(this.username);
  assertThat(this.userData.favouriteActivities,hasItem(activity));
})

Given('any spot within {string} km is selected', async function (radius) {
  const request_trails = createRequest({
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        
        "state": "",
        "lat": this.userData.homeLocation.lat,
        "lon": this.userData.homeLocation.long,
        "radius": parseInt(radius),
    })
})
const response = createResponse();

await getHikingTrails(request_trails, response);
let resData = response._getData();
resData = JSON.parse(resData)

let spot = resData[  
  Math.floor(Math.random() * resData.length)
  ]
this.selected_spot = spot

assertThat(this.selected_spot,is(not(null)))

})

Given('user chooses to plan the activity on {string} at {string} until {string}', function (date, start_time, end_time){
  this.start_date = date + 'T' + start_time + 'Z';
  this.end_date = date + 'T' + end_time + 'Z';
})

Then('their activity can be planned for {int} hours', async function (hours) {
  const request_geocode = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "lat": this.selected_spot.lat,
        "long": this.selected_spot.lon
    })
  }
  const response1 = createResponse();

  await reverseGeocode(request_geocode, response1);
  
  let address = JSON.parse(response1._getData()).output;

  const request = createRequest({
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        "username": this.username,
        "streetAddress": address,
        "startDate": this.start_date,
        "endDate": this.end_date,
        "activity": this.selected_activity
    })
  })

  const response2 = createResponse();

  createPlan(request, response2);

  const all_plans = readJSON('plans.json');
  const expected = {"username":this.username,
                    "streetAddress":address,
                    "startDate":this.start_date,
                    "endDate":this.end_date,
                    "activity":this.selected_activity,}
  
  
  assertThat(all_plans, hasItem(expected));
})

AfterAll(function (){
  const dataResponse = readJSON('plans.json');
  const lastElement = dataResponse.pop()
  writeJSON('plans.json', dataResponse,'o')
})
