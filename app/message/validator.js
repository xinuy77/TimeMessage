// validate NG words
function validMessage(msg) {
    if(requiredPropertiesExist(msg) && 
       noNull(msg)                  &&
       validType(msg)               &&
       validSize(msg)) {
        return true;
    }
    return false;
}

function requiredPropertiesExist(msg) {
    if(msg.hasOwnProperty('text')   && 
       msg.hasOwnProperty('route')  && 
       msg.hasOwnProperty('sender') &&
       msg.hasOwnProperty('title')  &&
       msg.hasOwnProperty('available_date')) {
        return true;
    } 
    return false;
}

function noNull(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            return false;
        }
    }
    return true;
}

function validType(msg) {
    if(isString(msg.text)   &&
       isString(msg.route)  &&
       isString(msg.sender) &&
       isString(msg.title)  &&
       isString(msg.available_date)) {
        return true;
    }
    return false;
}

function validSize(msg) {
    if(msg.text.length   < 147 &&
       msg.title.length  < 40  &&
       msg.sender.length < 20) {
        if(msg.text.length   > 0  &&
           msg.title.length  > 0  &&
           msg.sender.length > 0) {
            return true;
        }
    }
    return false;
}


function isString(prop) {
    if(typeof prop === "string") {
        return true;
    }
    return false;
}

function isNumber(prop) {
    if(typeof prop === "number") {
        return true;
    }
    return false;
}

function isBool(prop) {
    if(typeof prop === "boolean") {
        return true;
    }
    return false;
}

module.exports = validMessage;
