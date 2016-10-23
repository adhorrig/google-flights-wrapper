var request = require('request');
var data = require('./data.json');
var key = '';
var endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+key;

function api(adultCount, maxPrice, solutions, origin, destination, date){

  data.request.passengers.adultCount = adultCount;
  data.request.maxPrice = maxPrice;
  data.request.solutions = solutions;
  data.request.slice[0].origin = origin;
  data.request.slice[0].destination = destination;
  data.request.slice[0].date = date;


  request({method: "post",  url: endPoint,  body: data,  json: true}, function(err, resp, body){

    var info = [];
    var jsonObject = {};
    var airline;
    var price;

    if (body.error){
      return console.error(body.error);
    } else {
      var price= body.trips.tripOption[0].saleTotal;
      if(solutions >= 2){
        for(i=0; i < body.trips.tripOption.length; i++){
          airline = body.trips.tripOption[i].slice[0].segment[0].flight.carrier
          price = body.trips.tripOption[i].saleTotal
          jsonObject = {"airline": airline , "price": price};
          info.push(jsonObject);
        }
        return info;
      } else {
        airline = body.trips.tripOption[0].slice[0].segment[0].flight.carrier
        price = body.trips.tripOption[0].saleTotal
        jsonObject = {"airline": airline, "price":price}
        info.push(jsonObject);
        return info;
      }
    }
  });
}
