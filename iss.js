const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IPObject = JSON.parse(body);
    const IP = IPObject.ip;
    callback(null, IP);

  });

};

// IP: 154.20.177.248
//takes in an IP address and returns the latitude and longitude for it.
const fetchCoordsByIP = function(IP, callback) {
  request("http://ipwho.is/" + IP, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    
    // change JSON string to object
    const bodyObject = JSON.parse(body);
    callback(null, bodyObject);
  });
};





module.exports = { fetchMyIP, fetchCoordsByIP };