const { Given, When, Then } = require('@cucumber/cucumber');
const { assertThat, is, not, truthy } = require('hamjest');
const {createRequest, createResponse} = require('node-mocks-http')
const findUser = require("../../src/helpers/user/findUser.js");
const findPlans = require("../../src/helpers/plans/findPlans.js");
const {validDate, beforeDate} = require('../../src/helpers/plans/checkDate.js');
const {createICS, sendInvite} = require("../../src/helpers/plans/sharePlan.js");
const sharePlan = require('../../src/pages/api/plan/sharePlan.js');

Given ('user {string} exists', function (username) {
    
    this.user = findUser(username);
    assertThat(this.user, is(not(null)));
 
})

Given ('the user {string} has a plans', function (username) {
    
    this.plans = findPlans(username);
    assertThat(this.plans, is(truthy()));
 
})

Given ('the user {string} has a valid start date', function (username) {
    
    this.plans = findPlans(username);
    let result = validDate(this.plans.startDate);
    assertThat(result, is(truthy()));
    
})

Given ('the user {string} has a valid end date', function (username) {
    
    this.plans = findPlans(username);
    let result = validDate(this.plans.endDate);
    assertThat(result, is(truthy()));
    
})

Given ('the user {string} end date is after the start date', function (username){

    this.plans = findPlans(username);
    let result = beforeDate(this.plans.startDate, this.plans.endDate);
    assertThat(result, is(truthy()));
})

When ("the user {string} has a plan and sends an invite to an email", function (username) {
    
    this.plans = findPlans(username);
    this.icsContent = createICS(this.plans);
    
 })

 Then ("the system should send the invite", function () {

    //enter email you would like to receive invitation to
    let testEmail = "eliordesage@gmail.com";
    result = sendInvite(testEmail,this.icsContent);
    assertThat(result, is(truthy()));

})

Given ('the user enters a plan and an invitee email', async function (){

 //mock status contain json object
 const request = createRequest({
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: {
        "plan": { 
               "username": "testAdminUser123",
               "streetAddress": "123 anyStreet, province, Canada ", 
               "startDate": "2023-04-15T10:20:00Z",
               "endDate": "2023-04-16T12:30:00Z",
               "activity": "hiking" 
               },
        "inviteeEmail": "outdoornow11@gmail.com",
    },
  });

    const response = createResponse();

    //call sharePlan
    await sharePlan(request, response);

    this.resData = response._getData();

    //asserts that the response exists
    assertThat(this.resData, is(not(null)));

})
