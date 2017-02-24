module.exports = (apikey) => {
  return {
    api: (adultCount, maxPrice, solutions, origin, destination, date, fn) => {
      const request = require('request');
      const endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+apikey;
      let data = require('../data.json');

      data.request.passengers.adultCount = adultCount;
      data.request.maxPrice = maxPrice;
      data.request.solutions = solutions;
      data.request.slice[0].origin = origin;
      data.request.slice[0].destination = destination;
      data.request.slice[0].date = date;

      request({method: "post",  url: endPoint,  body: data,  json: true}, (err, resp, body) => {

        let info = [];
        let jsonObject = {};
        const airline;
        const price;

        if(body.error) return console.error(body.error);
        for(i=0; i < body.trips.tripOption.length; i++){
          airline = body.trips.tripOption[i].slice[0].segment[0].flight.carrier
          price = body.trips.tripOption[i].saleTotal
          jsonObject = {"airline": airline , "price": price};
          info.push(jsonObject);
        }
        fn(info);
      });
    }
  }
}
