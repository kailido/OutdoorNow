
const checkDate = {
    validDate,
    beforeDate,
}

function validDate(dateString){

    const date = new Date(dateString);

    if(isNaN(date.getTime()) || date <= Date()){
        return false;
    }

     return true;
}

function beforeDate(firstDate, secondDate){

    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    if(date2 >= date1){
        return true;
    }

     return false;
}

module.exports = {checkDate, validDate, beforeDate,};