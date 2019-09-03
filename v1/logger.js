const url = 'http://mylogger.io/log';

function log(message) {

 console.log(message)
}

function age (a,b) {
 console.log(a+b)
}


// module.exports.logMe = log

// module.exports.add = age;

module.exports = {
 add: age,
 logMe: log
}