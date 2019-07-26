const request = require("request");
const moment = require("moment");

const forecast = (latitude,longtitude,timeOffset,callback)=>{
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
            // console.log(body.daily.data[0].sunsetTime);
            // console.log(timeOffset);
            const sunsetTime = moment(body.daily.data[0].sunsetTime).utcOffset(timeOffset).format("HH:mm");
            
            
            callback(undefined,
                body.daily.data[0].summary+"It is currently " + body.currently.temperature + "degrees out. there is a " +body.currently.precipProbability + "% chance of rain."
                + " Sun will set at : " + sunsetTime
            )
        }
    })
}

module.exports = forecast;