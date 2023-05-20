//gather required resouces
import login from '../../src/pages/api/user/login'

//request with username and password to be used in tests
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"username": "testAdminUser123",
        "password": "test_Password.1770"})
}

test('expect login API to return a response', () => {

    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call login with req and res
    login(request, response);

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);

});

test('expect login API to return account details when given valid account details', () => {
   
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}
    
    //call login with req and res
    login(request, response);

    //request logs in a specific user in users.json
    //response should return the matching data from users.json
    expect(json.mock.calls[0][0]).toMatchObject({
        "username": "testAdminUser123",
        "password": "test_Password.1770",
        "homeLocation": {
          "long": -123.3254259732314,
          "lat": 48.47917293604235
        },
        "favouriteActivities": [
          "biking",
          "hiking",
          "skateboarding",
          "skiing"
        ],
        "maxTravelRadius": 20
      });
});

test('expect login API to throw an error when an incorrect password is given', () => {
   
  //mock json object
  const json = jest.fn();
  //mock status containing JSON object
  const status = jest.fn(() => {
      return {json}
  });
  //build response object
  const response = {status}
  //create bad request to throw an error 
  const badRequest = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"username": "testAdminUser123",
        "password": "wrongPassword"})
}
  let result;
  //call login with req and res
  try{
    login(badRequest, response);
  }catch(error){
    result = error;
  }

  //request logs in a specific user in users.json
  //response should return the matching data from users.json
  expect(result).toMatch("incorrect password");
});