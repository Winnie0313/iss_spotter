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


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
// { latitude: '49.1665898', longitude: '-123.133569' }
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat= ${coords.latitude} &lon= ${coords.longitude} `, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // error handling if status code is not 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if get valid response, pass to callback
    const bodyObject = JSON.parse(body);

    const ISSFlyOverTimesArray = bodyObject.response;
    callback(null, ISSFlyOverTimesArray);
  });

};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };