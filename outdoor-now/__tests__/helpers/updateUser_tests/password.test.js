//gather required resouces
import signUp from '../../../src/pages/api/user/signUp';
import findUser from '../../../src/helpers/user/findUser';
import readJSON from '../../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../../src/helpers/user/updateUser';

const original_password = "test_Password.1770";


test('expect password to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.password).toBeTruthy();

});

//Change password
test('expect pasword to change from "test_Password.1770" to "new_Password.1770" ', () => {

    const user = "testAdminUser123";
    let new_password = "new_Password.1770";

    //updating password to new_password.1770
    updateUser(user,"password", new_password);
    expect(findUser(user).password).toEqual(new_password);

    /*
    const result = findUser(user);
    console.log(result.password);
    */
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    updateUser(user,"password", original_password);
});
