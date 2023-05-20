//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import updateLocation from '../../src/pages/api/user/updateLocation';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../src/helpers/user/updateUser';

//request with username, homeLocation
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "testAdminUser123",
        "homeLocation": {
            "lat": 48.47917293604235,
            "long": -123.3254259732314
        },
    })
}

test('expect homeLocation to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.homeLocation).toBeTruthy();

});

test('expect homeLocation lat to change from "48.47917293604235" to "69" ', () => {

    //homeLocation starts off as 48.47917293604235,-123.3254259732314
    const user = "testAdminUser123";
    const result = findUser(user);
    const new_homeLocation = {
        "lat": 69,
        "long": -123.3254259732314,
        };

    //updating homeLocation to 69,-123.3254259732314
    updateUser(user,"homeLocation", new_homeLocation);
    expect(findUser(user).homeLocation).toEqual(new_homeLocation);
});

test('expect updateLocation API to return a response', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    updateLocation(request, response)

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
});


test('expect homeLocation to change from 69,-123.3254259732314 to 69,420 but with api', () => {

    //request with username, homeLocation
    const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "testAdminUser123",
        "homeLocation": {
            "lat": 69,
            "long": 420
        },
    })
    }

     //mock json object
     const json = jest.fn();
     //mock status containing JSON object
     const status = jest.fn(() => {
         return {json}
     });
     //build response object
     const response = {status}

    //homeLocation starts as 69,-123.3254259732314
    const user = "testAdminUser123";
    const new_homeLocation = {
        "lat": 69,
        "long": 420,
        };

    //updating homeLocation to 69,420
    updateLocation(request,response);
    expect(findUser(user).homeLocation).toEqual(new_homeLocation);
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    const result = findUser(user);
    const location = {
        "lat": 48.47917293604235,
        "long": -123.3254259732314
    };
    updateUser(user,"homeLocation", location);
});