const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const forecastButton = document.querySelector("#forecast-button");

forecastButton.addEventListener("click",()=>{

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    var offset = new Date().getTimezoneOffset();
    if(!navigator.geolocation)
        return alert("Geoloccation is not supported by your browser");

    navigator.geolocation.getCurrentPosition((pos)=>{
        fetch("/weather/forecast?latitude="+encodeURIComponent(pos.coords.latitude)+"&longitude="+encodeURIComponent(pos.coords.longitude)+"&timezone="+encodeURIComponent(offset))
        .then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                {
                    messageOne.textContent = data.error;
                }
                else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            
            })
        })
    })
})

weatherform.addEventListener("submit", (e)=>{
    e.preventDefault();

    const location = search.value;
    var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(offset);
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("/weather?adress="+ encodeURIComponent(location)+"&timezone="+encodeURIComponent(offset)).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        
        })
    })
})