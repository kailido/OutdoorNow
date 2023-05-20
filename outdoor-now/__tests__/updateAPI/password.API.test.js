//gather required resouces
import signUp from '../../src/pages/api/user/signUp';
import updatePassword from '../../src/pages/api/user/updatePassword';
import findUser from '../../src/helpers/user/findUser';
import readJSON from '../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../src/helpers/user/updateUser';

//request with username, password
const request = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "username": "testAdminUser123",
        "password": "test_Password.1770",
    })
}

test('expect password to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.password).toBeTruthy();

});

test('expect password to change from test_Password.1770 to test2 ', () => {

    //password starts off as "test_Password.1770"
    const user = "testAdminUser123";
    const result = findUser(user);

    //updating password to "test2"
    updateUser(user,"password", "test2");
    expect(findUser(user).password).toEqual("test2");
});

test('expect updatePassword API to return a response', () =>{
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //call signUp
    updatePassword(request, response)

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
});

test('expect password to change from test2 to test3 but with api', () => {
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": "testAdminUser123",
            "password": "test3",
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

    //password starts off as "test_Password.1770"
    const user = "testAdminUser123";

    //updating password to "test2"
    updatePassword(request,response);
    expect(findUser(user).password).toEqual("test3");
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    const result = findUser(user);
    updateUser(user,"password", "test_Password.1770");
});