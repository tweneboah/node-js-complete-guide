
//=================
//MODULES
//================

//A module is an object that has many properties but we are concern with module.exports  console.log(modules)

//In node any function we create becomes global so to avoid this we use what is call module. 

//Module encapsulate all functions and make it private

//Any file we created apart from the the main file becomes a module

//To make a module/function/object public we pass it to module.expoorts


//==================
//USING THE MODULE
//=================

const logger = require('./logger');

logger.logMessage('WELCOME')

