const findUser = require("../../../helpers/user/findUser");
const writeJSON = require("../../../helpers/JSON_utils/writeJSON");

function signUp(req, res) {
    //store body data
    const reqBody = req.body;
    let newUser;
    //figure out if reqBody is a string
    if(typeof reqBody === 'string'){
        //extract JSON data from request body
        newUser = JSON.parse(req.body);
    }else{
        newUser = req.body;
    }
    //ensure newUser data is not null
    if(newUser === null || newUser === {}){
        throw "please enter user data"
    }
    //see if newUser already exists in users.json
    if(findUser(newUser.username) != false){
        throw "user with that username already exists"
    }
    //write newUser data
    writeJSON('users.json', newUser, 'a')
    res.status(200).json({});
}

module.exports = signUp;