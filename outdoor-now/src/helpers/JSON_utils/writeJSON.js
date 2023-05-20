//import file reading module and create the path varible to the data folder
const fs = require('fs');
const readJSON = require('./readJSON')
const dataPath = 'src/data/'

//the function writes to a JSON file, use with mode a to append data to the file or use o to overwrite the file
function writeJSON(fileName, data, mode) {

    //set currData to appropriate value based on mode
    var currData = null;
    if(mode === 'a'){
        currData = readJSON(fileName);
        currData.push(data);
    } else if (mode === 'o'){
        currData = data;
    }
    
    //convert object to JSON string for writing
    const newDataString = JSON.stringify(currData, null, 2);
    
    //write the data string and log any errors
    fs.writeFileSync((dataPath + fileName), newDataString, (err) => {
        if (err){
            console.log(err);
        };
    });
}

module.exports = writeJSON;