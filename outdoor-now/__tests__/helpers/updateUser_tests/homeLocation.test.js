//gather required resouces
import signUp from '../../../src/pages/api/user/signUp';
import findUser from '../../../src/helpers/user/findUser';
import readJSON from '../../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../../src/helpers/user/updateUser';

const original_homeLocation = {
    "lat": 48.47917293604235,
    "long": -123.3254259732314
};


test('expect homeLocation to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.homeLocation).toBeTruthy();

});

//Change homeLocation
test('expect long to change from "-123.3254259732314" to "420" ', () => {

    const user = "testAdminUser123";
    const new_homeLocation = {
        "lat": 48.47917293604235,
        "long": -123.3254259732314
        };

    //updating long to 420
    updateUser(user,"homeLocation", new_homeLocation);
    expect(findUser(user).homeLocation).toEqual(new_homeLocation);

});

//Change homeLocation
test('expect lat to change from "48.47917293604235" to "69" ', () => {

    const user = "testAdminUser123";
    const new_homeLocation = {
        "lat": 69,
        "long": 420,
        };

    //updating homeLocation to 420,69
    updateUser(user,"homeLocation",new_homeLocation);
    expect(findUser(user).homeLocation).toEqual(new_homeLocation);
});


//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    updateUser(user,"homeLocation", original_homeLocation);
});
