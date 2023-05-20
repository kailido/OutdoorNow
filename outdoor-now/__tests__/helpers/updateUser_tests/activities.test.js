//gather required resouces
import signUp from '../../../src/pages/api/user/signUp';
import findUser from '../../../src/helpers/user/findUser';
import readJSON from '../../../src/helpers/JSON_utils/readJSON';
import writeJSON from '../../../src/helpers/JSON_utils/writeJSON';

import updateUser from '../../../src/helpers/user/updateUser';

const original_activities = ["biking","hiking","skateboarding","skiing"];


test('expect favouriteActivities to exist', () => {

    //username exists in users.json
    const user = "testAdminUser123";
    const result = findUser(user);
    //console.log(result);
    expect(result.favouriteActivities).toBeTruthy();

});

//remove all activities from favouriteActivities
beforeAll(() => {
    
    const user = "testAdminUser123";
    const result = findUser(user);
    const no_activities = [];

    updateUser(user,"favouriteActivities", no_activities);
});

//Add hiking to favouriteActivities
test('expect favourite activities to change from " " to "hiking" ', () => {

    //activities starts off as " "
    const user = "testAdminUser123";
    let new_activities = ["hiking"];

    //updating favouriteActivities to hiking
    updateUser(user,"favouriteActivities", ["hiking"]);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);

});

//Add biking to favouriteActivities
test('expect favourite activities to change from "hiking" to "hiking, biking" ', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["hiking", "biking"];

    //updating activities to "hiking, biking"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Add skiing to favouriteActivities
test('expect favourite activities to change from "hiking, biking" to "hiking, biking, skiing" ', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["hiking", "biking", "skiing"];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Add skateboarding to favouriteActivities
test('expect favourite activities to change from "hiking, biking, skiing" to "hiking, biking, skiing, skateboarding" ', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["hiking", "biking", "skiing", "skateboarding"];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Remove hiking from favouriteActivities
test('expect favourite activities to change from "hiking, biking, skiing, skateboarding" to "biking, skiing, skateboarding"', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["biking", "skiing", "skateboarding"];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Remove biking from favouriteActivities
test('expect favourite activities to change from "biking, skiing, skateboarding" to "skiing, skateboarding"', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["skiing", "skateboarding"];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Remove skiing from favouriteActivities
test('expect favourite activities to change from "skiing, skateboarding" to "skateboarding"', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = ["skateboarding"];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//Remove skateboarding from favouriteActivities
test('expect favourite activities to change from "skateboarding" to " "', () => {

    //activities starts off as "hiking"
    const user = "testAdminUser123";
    let new_activities = [];

    //updating activities to "hiking, biking, skiing"
    updateUser(user,"favouriteActivities",new_activities);
    expect(findUser(user).favouriteActivities).toEqual(new_activities);
});

//clean up test user
afterAll(() => {
    const user = "testAdminUser123";
    updateUser(user,"favouriteActivities", original_activities);
});
