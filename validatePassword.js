const validatePassword = require('./validatePassword')

console.log(validatePassword("") === false)
console.log(validatePassword("aksjgkaasdf") === false)
console.log(validatePassword("12512345632446") === false)
console.log(validatePassword("12512ajskdhgk") === true)