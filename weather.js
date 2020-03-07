const weather = document.querySelector(".js-weather");

const API_KEY="1eee0c760879bb96fddd445ddda8b80b";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(//데이터를 얻어오는 방법
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){ //데이터가 완전 들어왔을때 호출
            return response.json();
        }).then(function(json){
            const tmperature = json.main.temp;
            const place = json.name; 
            weather.innerText=`${tmperature} @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude:latitude, //위도
        longitude:longitude //경도
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Cant access geo location")
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords ===null){
        askForCoords();
    }else{
        const parsedCoords=JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadCoords();

}
init();