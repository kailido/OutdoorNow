import readJSON from '../../../src/helpers/JSON_utils/readJSON'

test('readJSON function should exist', () =>{
    const response = readJSON('users.json');
    expect(response).toBeTruthy();
});

test('readJSON function should return a JSON object containing a user with the username testAdminUser123', () =>{
    const dataResponse = readJSON('users.json');
    expect(dataResponse[0].username).toBe('testAdminUser123');
});