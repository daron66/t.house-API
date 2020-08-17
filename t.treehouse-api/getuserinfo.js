// Require profile.js
const profile = require('./profile');
//process object checks whats available on the process object, the array property argv,
//getProfile("daronanderson")
//getProfile("chalkers")
//declare an array instead of repeatedly calling the function
const users = process.argv.slice(2);
//pass the users below
//output also shows non blocking in action, *less data gets printed first*.
//getprofile takes a parameter, for each passes a param in.
users.forEach(profile.get);
