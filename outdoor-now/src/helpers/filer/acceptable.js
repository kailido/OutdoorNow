export default function isAcceptable(minConditions, currentConditions){
    //group possible currentConditions
    var conditions = null;
    const RAINregex = /(Rain|rain)/;
    const DRIZZLEregex = /Drizzle/;
    const SNOWregex = /(Snow|snow)/;
    if(currentConditions === 'Overcast clouds' || currentConditions === 'Broken clouds' || currentConditions === 'Scattered clouds' || currentConditions === 'cloudy'){
        conditions = 'cloudy'
    }else if(currentConditions === 'Few clouds' ||currentConditions === 'Clear sky' || currentConditions === 'sunny'){
        conditions = 'sunny'
    }else if(RAINregex.test(currentConditions) || DRIZZLEregex.test(currentConditions || currentConditions === 'rain')){
        conditions = 'rain'
    }else if(SNOWregex.test(currentConditions) || currentConditions === 'snow'){
        conditions = 'snow'
    }else{
        return false
    }
    //intitiallize return value
    var acceptable = false;
    //if conditions are the same return true
    if(minConditions === conditions) { acceptable = true; }

    //sunny is greater than all other conditions therefore if condition is sunny return true
    if(conditions === 'sunny'){
        acceptable = true;
    }else if(conditions === 'cloudy'){//cloudy is greater than rain and snow
        if(minConditions === 'rain' || minConditions === 'snow'){
            acceptable = true;
        }
    }else if(conditions == 'rain'){//rain greater than snow
        if(minConditions === 'snow'){
            acceptable = true;
        }
    }

    return acceptable;
}