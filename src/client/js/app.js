/*Pixabay*/
let baseURLimages = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/'
const apiKeyImages = '&key=16027588-fcf7b42ae8f04c207e0c5e1d0';

/*GeoNames*/
let baseURL = 'http://api.geonames.org/searchJSON?q='
const apiKey = '&username=ch3b3ts';

/*Weatherbit*/
let baseURLweather = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const apiKeyWeather = 'b6622d7bbf6843c1b92e82c0c44cc8a9';

/* Initilizing variables to store data as required  */
var country = document.getElementById('country');
var long = document.getElementById('long');
var lat = document.getElementById('lat');
var daysAway = document.getElementById('daysAway');
var highTemp = document.getElementById('highTemp');
var lowTemp = document.getElementById('lowTemp');
var weatherDescription = document.getElementById('weatherDescription');



function performAction(e){
const newCity =  document.getElementById('city').value;
getCity(baseURL,newCity, apiKey);


}
const getCity = async (baseURL, city, key)=>{

  const res = await fetch('http://api.geonames.org/searchJSON?q='+city+key)
  try {

    const data = await res.json();
  
    const vacaDate =  document.getElementById('date').value;

    const vacaDateEnd =  document.getElementById('dateEnd').value;
    
     let d = new Date();
     let newDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    function parseDate(input) {
    let parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); 
   }

    var Difference_In_Time = parseDate(vacaDate).getTime() - parseDate(newDate).getTime(); 

    var Difference_In_Vacation = parseDate(vacaDateEnd).getTime() - parseDate(vacaDate).getTime(); 
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    var Difference_In_Vacation_In_Days = Difference_In_Vacation / (1000 * 3600 * 24);

    country = data.geonames[0].countryName;
    document.getElementById('country').innerHTML = country;

 
    long = data.geonames[0].lng;
    document.getElementById('long').innerHTML = long;

    lat =  data.geonames[0].lat;

    document.getElementById('lat').innerHTML = lat;


    daysAway = Difference_In_Days;

    document.getElementById('daysAway').innerHTML = daysAway + ' days away!';


    const daysTotal = Difference_In_Vacation_In_Days;
    document.getElementById('tripLength').innerHTML = daysTotal + ' days.';


    const weatherInfo = fetch('https://api.weatherbit.io/v2.0/forecast/daily?'+'lat='+ lat +'&lon='+ long +'&key='+apiKeyWeather).then( (weatherResponse) => {
       return weatherResponse.json(); 
    })
    .then((dataWeather) => {
      //Defining weather Description
      weatherDescription = dataWeather.data[15].weather.description;
       //Defining weather high temp
       highTemp = dataWeather.data[15].high_temp;
       //Defining weather low temp
       lowTemp = dataWeather.data[15].low_temp;

       //Adding to the weather div
      document.getElementById('weather').innerHTML = weatherDescription + '<br/>High Temp: '+ highTemp + '<br/>Low Temp: ' + lowTemp;

           //Fetching the image API
           const imageInfo = fetch('https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?safesearch'+ apiKeyImages + '&q=' + city + '+city' + '&image_type=photo')
           .then( (imageResponse) => {
           return imageResponse.json(); 
           })
           .then((dataImage) => {
           const imageSrc = dataImage.hits[0].largeImageURL;
           document.getElementById('imgDiv').innerHTML = '<img class="imgClass" src="' + imageSrc + '" />';
          }).catch((err) => {

              const imageSrcOops = "/src/client/media/opps.jpg";
              document.getElementById('imgDiv').innerHTML = '<img class="imgClass" src="' + imageSrcOops + '" />';

          });
    });
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

export { performAction }

