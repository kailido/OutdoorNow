import writeJSON from '../../../src/helpers/JSON_utils/writeJSON'
import readJSON from '../../../src/helpers/JSON_utils/readJSON'

//data to write
const data = {
    "username": "writeTest",
    "test": "writePassword",
    "homeLocation": {
        "long": -123.3254259732314,
        "lat": 48.47917293604235
    },
    "favouriteActivities": ["walking"],
    "maxTravelRadius": 25
}

afterEach(() => {

    //delete the added data after each test
    const dataResponse = readJSON('users.json');

    //delete the added data by poping the last element of the JSON array
    const lastElement = dataResponse.pop();

    //write the new data to the file
    writeJSON('users.json', dataResponse, 'o');

});

test('expect writeJSON successfully write the data resulting in users.js containing a user with username writeTest', () =>{

    //write data to users.json
    writeJSON('users.json', data, 'a');

    //retrive data and check that the data was written
    const dataResponse = readJSON('users.json');
    expect(dataResponse[dataResponse.length - 1].username).toBe('writeTest');
    
});