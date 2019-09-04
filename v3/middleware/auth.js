
//Dummy midleware for authentication when a user visit api/courses

const auth = (req, res, emm) => {
   console.log('You are authenticated')
   next()
}

module.exports.auth = auth;