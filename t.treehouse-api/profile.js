//require https module
const https = require('https');
//require http module
const http =  require('http');


// Print error message
function PrintError(error) {

    console.error(error.message);

}

//username
//const username = "A Treehouse User";
//wrap username in a function called get profile

//function defines which parameters & prints msg to console
//using a template literal
function consoleMessage(username, badgeCount, points) {

    const message = `${username} has ${badgeCount}, total achievement(s) and ${points} points in JS.`;
    console.log(message);

}

//call the function consoleMessage
//test some parameters
//consoleMessage(`${username}`)
//main function
function get(username) {

    try {

        //Defining the request, connect to the api url
        //Implement a call back with the function =>
        //also use try block for domain incase protocol is invalid
        const rqst = https.get(`https://teamtreehouse.com/${username}.json`, res => {
            if (res.statusCode === 200) {
                let body = "";
                // read the data
                //when you see the data event there is always an end event
                res.on('data', data => {
                    body += data.toString();
                });

                //emit the end handler
                //end event listener/handler use 'end'
                res.on('end', () => {
                    try {
                    //console.log(body);
                    //parse the data
                    const profile = JSON.parse(body);
                    //Use console.dir to look inside the profile
                    //View values of profile with console.dir
                    //console.dir(profile);
                    consoleMessage(username, profile.badges.length, profile.points.JavaScript)
                    //typeof => if unnsure of the type of object use typeof
                    //console.log(typeof body);
                } catch (error) {
                    PrintError(error);
                }
            });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message + '\nMake sure users profile name is spelled correctly...');
                PrintError(statusCodeError);
            }
            //dir is great for debugging
            //console.dir(res);
            //Test Status code of page for connection
            //console.log("Status Code:", res.statusCode);
        });

        //Programmers typically use e, for error, but error is used here for clarity
        rqst.on('error', PrintError);
    } 
    
    catch (error) {
        console.error(error.message)
    }
    
}

module.exports.get = get;
