const request = require("request");

const forecast = (latitude,longtitude,callback)=>{
    const url = "https://api.darksky.net/forecast/d8ba9527d22824b23441e5fcb3361561/" + latitude + "," + longtitude +"?units=si"
    
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect to weather service.",undefined);
        }
        else if(body.error)
        {
            callback("Unable to find location",undefined);
        }
        else
        {
            const sunsetTime = timeConverter(body.daily.data[0].sunsetTime);
            callback(undefined,
                body.daily.data[0].summary+"It is currently " + body.currently.temperature + "degrees out. there is a " +body.currently.precipProbability + "% chance of rain."
                + " Sun will set at : " + sunsetTime
            )
        }
    })

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = hour + ':' + min + ':' + sec ;
        return time;
      }
}

module.exports = forecast;