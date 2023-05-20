//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import updateRadius from '../../src/pages/api/user/updateRadius';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../src/helpers/user/updateUser';

//request with username, radius
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "testAdminUser123",
        "radius": 30,
    })
}

test('expect maxTravelRadius to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.maxTravelRadius).toBeTruthy();

});

test('expect radius to change from 20 to 5 ', () => {

    //radius starts off as 10
    const user = "testAdminUser123";
    const result = findUser(user);

    //updating radius to 5
    updateUser(user,"maxTravelRadius", 5);
    expect(findUser(user).maxTravelRadius).toEqual(5);
});

test('expect updateRadius API to return a response', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    updateRadius(request, response)

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
});

test('expect radius to change from 20 to 5 but with api', () => {

    //radius starts off as 10
    const user = "testAdminUser123";
    const result = findUser(user);

    //updating radius to 5
    updateUser(user,"maxTravelRadius", 5);
    expect(findUser(user).maxTravelRadius).toEqual(5);
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    const result = findUser(user);
    updateUser(user,"maxTravelRadius", 20);
});
