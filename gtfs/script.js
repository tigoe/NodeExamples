var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');
const apiKey = '4RQogyDRrd51zpH2wUrjyo0UkmYr3CO9sxQDp0aa';
const feedUrl = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace';

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

var requestSettings = {
  method: 'GET',
  url: feedUrl,
  encoding: null,
  headers: { "x-api-key": apiKey }
};
request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      console.log(entity);
      if (entity.trip_update) {
        // console.log(entity.trip_update);
      }
    });
  }
});

