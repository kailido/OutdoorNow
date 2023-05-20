const readJSON = require("../JSON_utils/readJSON");

function findPlans(toFind){
    //get all plans
    const allUsers = readJSON('plans.json');
    //itterate over all users to find desired user
    for (var user of allUsers){
        //check if user is the desired user
        if(user.username === toFind){
            return user;
        }
    }
    //plans not found and therefore return false
     return false;
}
module.exports = findPlans;