const { Given, When, Then, AfterAll} = require('@cucumber/cucumber')
const signUp = require('../../src/pages/api/user/signUp');
const findUser = require('../../src/helpers/user/findUser');
const { assertThat,is,not, hasItem, contains} = require('hamjest');
const { createMocks, createRequest, createResponse, body} = require('node-mocks-http');
const login = require('../../src/pages/api/user/login');
const getHikingTrails = require("../../src/pages/api/getTrails/getHikingTrails");
const reverseGeocode = require('../../src/helpers/googleAPI/reverseGeocode')
const createPlan = require('../../src/pages/api/plan/createPlan');
const createPlanRequest = require('../../src/helpers/plans/createPlanRequest');
const readJSON = require('../../src/helpers/JSON_utils/readJSON')
const writeJSON = require('../../src/helpers/JSON_utils/writeJSON')


Given('the user {string} has selected a {string} spot for {string} at {string} for {string}', function (user, activity, date, time, hike) {
    this.username = user;
    this.activity = activity;
    this.date = date;
    this.time = time;
    

    this.location = hike
    assertThat(this.activity, is(not(null)))
    assertThat(this.date, is(not(null)))
    assertThat(this.time, is(not(null)))
    assertThat(this.location, is(not(null)))
})

When('the share plan button is clicked with shared email {string}', function (email) {
    this.email = email;
    assertThat(this.email, is(not(null)))
})

Then('a new plan request is created starting at {string} and ending at {string} at the location {string}', async function (start_time, end_time, actual_loc) {

    const actual_plan = await createPlanRequest(this.username, this.activity, this.date, this.time, this.location);
    const mock_response = createResponse();
    request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(actual_plan)
        }

    createPlan(request, mock_response);

    
    const all_plans = readJSON('plans.json');
    const expected = {"username":this.username,
                        "streetAddress":actual_loc,
                        "startDate":this.date + 'T' + start_time + ':00Z',
                        "endDate":this.date + 'T' + end_time + ':00Z',
                        "activity":this.activity}
    
    

    assertThat(all_plans, hasItem(expected)); 
})

AfterAll(function (){
    const dataResponse = readJSON('plans.json');
    const lastElement = dataResponse.pop()
    writeJSON('plans.json', dataResponse,'o')
  })
  