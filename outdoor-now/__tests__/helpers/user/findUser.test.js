import findUser from "../../../src/helpers/user/findUser";

test('expect function to return at least one user', () => {

    //username exists in users.json
    const user = "testAdminUser123";

    const result = findUser(user);

    expect(result).toBeTruthy();
});

test('expect function to return the correct user', () => {
    const user = "testAdminUser123";

    const result = findUser(user);

    expect(result.username).toEqual(user);
})