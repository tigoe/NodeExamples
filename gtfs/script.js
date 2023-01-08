var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
const https = require('https');
const apiKey = '4RQogyDRrd51zpH2wUrjyo0UkmYr3CO9sxQDp0aa';

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

var requestSettings = {
  method: 'GET',
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
  encoding: null,
  headers: { "x-api-key": apiKey }
};
request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    // console.log(feed);
    feed.entity.forEach(function(entity) {
      console.log(entity);
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
});

// https.get(
//   "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
//   {
//     headers: { "x-api-key": apiKey }
//   },
//   (resp) => {
//     resp.on('data', (chunk) => {
//       // console.log("Receiving Data");
//       body += chunk;

//     });
//     resp.on('end', () => {
//       console.log("Finished receiving data");
//       var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
//       feed.entity.forEach(function (entity) {
//         if (entity.trip_update) {
//           console.log(entity.trip_update);
//         }
//       });
//     });
//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });