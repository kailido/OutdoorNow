/* 
* This file contains a fetch wrapper to simplify using fetch. I have written fetch wrappers
* like this many times before and thereofore, since I know it works and is hard to
* test, there is no TDD taking place here 
*/

const fetchWrapper = {
    get,
    post,
}

function get(url, headers){
    
    const options = {
        method: 'GET',
        headers: headers
    }

    return fetch(url, options).then(handle)

}

function post(url, JSONdata){

    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(JSONdata)
    }

    return fetch(url, options).then(handle)

}


//helper function to handle the response and parse the JSON data
function handle(response){

    return response.text().then((text) => {
        let resData;
        try{
            resData = JSON.parse(text)
        }catch(error){
            console.log("error parsing JSON: ", error, text)
            return false
        }

        //catch any error
        if(!response.ok){
            const err = resData.message || response.statusText
            return Promise.reject(err)
        }

        return resData
    })
}
module.exports.fetchWrapper = fetchWrapper;
module.exports.get = get;
module.exports.post = post;
