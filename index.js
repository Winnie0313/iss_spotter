
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP("154.20.177.248", (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  if (data.success){
    // if true, return object contains coordinates 
    let coordsObject = {};
    coordsObject.latitude = `${data.latitude}`;
    coordsObject.longitude = `${data.longitude}`;
    console.log('It worked! Returned coordinates: ', coordsObject);
  } else {
    // if false, return error msg returned by API
    console.log(`It didn't work! Error: Success status was false. Server message says: Invalid IP address when fetching for IP ${data.ip}`);
  };
  
});