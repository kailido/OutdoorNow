import updateUser from "../../../helpers/user/updateUser";
const findUser = require('../../../helpers/user/findUser');

export default function userActivities(req, res) {

    const reqBody = req.body
    let username;
    let activities;
    if(typeof reqBody === 'string'){
        const userActivities = JSON.parse(reqBody);
        username = userActivities.username;
        activities = userActivities.favouriteActivities;
    }else{
        username = reqBody.username
        activities = reqBody.favouriteActivities;
    }
    
    updateUser(username, "favouriteActivities", activities);

    res.status(200).json({});
}