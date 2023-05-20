//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';
import updateUser from '../../src/helpers/user/updateUser';
import login from '../../src/pages/api/user/login';
import updateActivities from '../../src/pages/api/user/updateActivities';
import updatePassword from '../../src/pages/api/user/updatePassword';
import updateLocation from '../../src/pages/api/user/updateLocation';

//request with username, password, and base account data to be used in tests
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "newTestUser",
        "password": "test_Password.2001",
        "homeLocation": {"long": null, "lat": null},
        "favouriteActivities": [],
        "maxTravelRadius": null
    })
}

//clean up after each test
afterEach(() => {
    //read all users
    const dataResponse = readJSON('users.json');
    //delete the added data by poping the last element of the JSON array
    const lastElement = dataResponse.pop();
    //write the new data to the file
    writeJSON('users.json', dataResponse, 'o');
});

test('expect signUp api to write new user data to users.json, and we can update the password', () =>{
    //mock json object
    const json = jest.fn();

    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    signUp(request, response)

    //call findUser to ensure that the user has been entered into users.json
    let user = findUser("newTestUser")

    expect(user).toMatchObject({
        "username": "newTestUser",
        "password": "test_Password.2001",
        "homeLocation": {"long": null, "lat": null},
        "favouriteActivities": [],
        "maxTravelRadius": null
    })

    //call login with req and res
    login(request, response);

    let new_password = "new_Password.1770";

    const request1 = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": user.username,
            "password": new_password,
        })
    }

    //updating password to new_password.1770
    updatePassword(request1,response);

    expect(findUser("newTestUser").password).toEqual(new_password);

    
});

test('expect signUp api to write new user data to users.json, and we can update the activities', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    signUp(request, response)

    //call findUser to ensure that the user has been entered into users.json
    let user = findUser("newTestUser")

    expect(user).toMatchObject({
        "username": "newTestUser",
        "password": "test_Password.2001",
        "homeLocation": {"long": null, "lat": null},
        "favouriteActivities": [],
        "maxTravelRadius": null
    })

    //call login with req and res
    login(request, response);

    const request2 = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": "newTestUser",
            "favouriteActivities": ["biking","hiking"],
        })
    }

    //updating activities to ["biking","hiking"]
    updateActivities(request2,response);

    expect(findUser("newTestUser").favouriteActivities).toEqual(["biking","hiking"]);
});

test('expect signUp api to write new user data to users.json, and we can update the homeLocation', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    signUp(request, response)

    //call findUser to ensure that the user has been entered into users.json
    let user = findUser("newTestUser")

    expect(user).toMatchObject({
        "username": "newTestUser",
        "password": "test_Password.2001",
        "homeLocation": {"long": null, "lat": null},
        "favouriteActivities": [],
        "maxTravelRadius": null
    })

    //call login with req and res
    login(request, response);

    const request3 = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": "newTestUser",
            "homeLocation": {
                "lat": 48.47917293604235,
                "long": -123.3254259732314
            },
        })
    }

    const new_homeLocation = {
        "lat": 48.47917293604235,
        "long": -123.3254259732314
        };

    //updating homeLocation to 48.47917293604235, -123.3254259732314
    updateLocation(request3,response);

    expect(findUser("newTestUser").homeLocation).toEqual(new_homeLocation);
});