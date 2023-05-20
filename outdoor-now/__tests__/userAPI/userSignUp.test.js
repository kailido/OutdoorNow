//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';

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


test('expect signUp API to return a response', () =>{
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

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
});

test('expect signUp api to wrtie new user data to users.json', () =>{
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
    const user = findUser("newTestUser")
    expect(user).toMatchObject({
        "username": "newTestUser",
        "password": "test_Password.2001",
        "homeLocation": {"long": null, "lat": null},
        "favouriteActivities": [],
        "maxTravelRadius": null
    })
});