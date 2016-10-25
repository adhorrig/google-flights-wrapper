#Google Flights Wrapper

## Installation

```
npm install google-flights-wrapper
```

## Usage

```
var qpx = require('google-flights-wrapper')(API_KEY_HERE);

qpx.api("1", "EUR5000", "1", "DUB", "GDN", "2016-12-14", function(data){
  //data is API response
});
```

## Api Parameters:

```
adultCount: The number of adults going on the trip.
maxPrice: The max price for the trip. Note: Must be prefixed with currency i.e. EUR.
solutions: The number of possible routes the API should return.
origin: The origin airport code.
destination: The destination airport code.
date: The date of the flight.
fn: A function to access the API response.
```
