const readJSON = require("../JSON_utils/readJSON");

function findUser(toFind){
    //get all users
    const allUsers = readJSON('users.json');
    //itterate over all users to find desired user
    for (var user of allUsers){
        //check if user is the desired user
        if(user.username === toFind){
            return user;
        }
    }
    //user not found and therefore return false
    return false;
}
module.exports = findUser; 