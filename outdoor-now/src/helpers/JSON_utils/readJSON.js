//import file reading module and create the path varible to the data folder
//import * as fs from 'fs';
const fs = require('fs');
const dataPath = 'src/data/'

function readJSON(fileName) {
    
    //make sure error is caught
    try{

        //read the file and parse the JSON string
        const dataString = fs.readFileSync(dataPath + fileName);
        const data = JSON.parse(dataString)

        //return the data
        return data;

    }catch(err){

        //log any errors
        console.log('error: ' + err);
        return;
    }
}
module.exports = readJSON;