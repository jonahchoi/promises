/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promiseConstructor = require('./promiseConstructor.js');
var promisifiedFn = require('./promisification.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  // read first line of file to get username
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    //access api using that username
    //get JSON data
    .then((username) => {
      console.log('USERNAME:', username);
      return promisifiedFn.getGitHubProfileAsync(username);
    })
    //Write to file writeFilePath with new data
    .then((data) => {
      console.log('USER DATA:', data);
      let writeFileAsync = Promise.promisify(fs.writeFile);
      return writeFileAsync(writeFilePath, JSON.stringify(data));
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
