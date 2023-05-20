const findUser = require('../../../helpers/user/findUser');
function login(req, res) {

    //parse username and password from request body
    const reqBody = req.body
    //if req body is a string parse it
    let username;
    let password;
    if(typeof reqBody === 'string'){
        const data = JSON.parse(reqBody);
        username = data.username;
        password = data.password;
    }else{
        username = reqBody.username;
        password = reqBody.password;
    }
    //find user by uesrname
    const user = findUser(username)
    //ensure the user exists
    if(user === false){
        res.status(400).json("incorrect username")
        throw "user with that username does not exist"
    }
    //authenticate user
    if (user.password === password) {
        //return user data
        res.status(200).json({
            "username": user.username,
            "password": user.password,
            "homeLocation": user.homeLocation,
            "favouriteActivities": user.favouriteActivities,
            "maxTravelRadius": user.maxTravelRadius
        });
    }else{
        res.status(400).json("incorrect password")
        throw "incorrect password"
    }
}

module.exports = login;