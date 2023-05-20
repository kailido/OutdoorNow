import findUser from "./findUser";
import writeJSON from "../JSON_utils/writeJSON";
import readJSON from "../JSON_utils/readJSON";

export default function updateUser(user, field, updated_field) {
    // copying list of all accounts in users.json
    const allUserAccounts = readJSON('users.json');

    // looping through each account, finding the user
    // won't work if users with same name
    for (var i = 0; i < allUserAccounts.length; i++) {
      if (allUserAccounts[i].username === user) {
        // updating field
        allUserAccounts[i][field] = updated_field;
        break;
      }
    }

    // writing updated json back to file
    writeJSON('users.json', allUserAccounts, 'o');
    
    //console.log(readJSON('users.json'))
    return null;
  }