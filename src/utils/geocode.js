const request = require("request");

const geocode = (adress,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(adress) +".json?access_token=pk.eyJ1Ijoibm9sa2VnIiwiYSI6ImNqcXphdWkxMDBjaGs0NGxzMnJqMDdyMmoifQ.OBeUYLP3sQw1aoFd_r8GNw&limit=1";

    request({url,json:true}, (error,{body})=>{
        if(error)
        {
            callback("Unable to connect to location services.",undefined);
        }
        else if(body.features.length == 0)
        {
            callback("Unable to find locatiom.",undefined);
        }
        else
        {
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0]
                
            })
        }
    })

}
module.exports = geocode;