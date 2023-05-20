//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import updateActivities from '../../src/pages/api/user/updateActivities';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../src/helpers/user/updateUser';

//request with username, favouriteActivities
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "testAdminUser123",
        "favouriteActivities": ["biking","hiking","skateboarding","skiing"],
    })
}

test('expect favouriteActivities to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.favouriteActivities).toBeTruthy();

});

test('expect updateActivities API to return a response', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    updateActivities(request, response)

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
});

test('expect favouriteActivities to change from ["biking","hiking","skateboarding","skiing"] to ["biking","hiking"] but with api', () => {
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": "testAdminUser123",
            "favouriteActivities": ["biking","hiking"],
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

    //favouriteActivities starts off as ["biking","hiking","skateboarding","skiing"]
    const user = "testAdminUser123";

    //updating favouriteActivities to ["biking","hiking"]
    updateActivities(request,response);
    expect(findUser(user).favouriteActivities).toEqual(["biking","hiking"]);
});

test('expect favouriteActivities to change from ["biking","hiking"] to ["biking","hiking","skateboarding"] but with api', () => {
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": "testAdminUser123",
            "favouriteActivities": ["biking","hiking","skateboarding"],
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

    //favouriteActivities starts off as ["biking","hiking"]
    const user = "testAdminUser123";

    //updating favouriteActivities to ["biking","hiking","skateboarding"]
    updateActivities(request,response);
    expect(findUser(user).favouriteActivities).toEqual(["biking","hiking","skateboarding"]);
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    const result = findUser(user);
    updateUser(user,"favouriteActivities", ["biking","hiking","skateboarding","skiing"]);
});