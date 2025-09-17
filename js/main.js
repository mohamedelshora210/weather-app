
const searchInput = document.getElementById("search");
const rowData = document.querySelector(".main");
const section = document.querySelector("#weather");
const loader = document.querySelector(".loader");
let coord = '';
let today = new Date()
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

let nextTomorrow = new Date(today);
nextTomorrow.setDate(today.getDate() + 2)
let data = [];

async function getApi(city){
   try
   {
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=97ebd7e5665d46c5b1a162255251309&q=${city}&days=7`);
       data = await response.json();
      displayData();
      changeImage();   
   }
   catch
   {
    if(coord){
        getApi(coord);
    }
    else
    {
        getApi("cairo")
    } 
   }
   finally
   {
        setTimeout(()=>{
            loader.classList.replace("d-flex" , "d-none")
        },1500)
   }
};

searchInput.addEventListener("input" , function(){
   getApi(this.value);
   
});
function changeImage(){
      if(data.current.temp_c <= 0)
      {
         console.log("snow");
         section.style.backgroundImage="url(images/snow.jpg)";
      }
      else if(data.current.temp_c <= 10)
      {
         console.log("rain+cold");
         section.style.backgroundImage="url(images/thunderstorm.jpg)";

      }
      else if(data.current.temp_c <=20)
      {
         console.log("rain");
         section.style.backgroundImage="url(images/rain.jpg)";
      }
      else if(data.current.temp_c <= 30)
      {
         console.log("clear");
         section.style.backgroundImage="url(images/clear.jpg)";
      }
      else if(data.current.temp_c <= 40)
      {
         console.log("hot"); 
         section.style.backgroundImage="url(images/sunny.png)";
      }
      else
      {
         console.log("very hot");
         section.style.backgroundImage="url(images/images.jfif)";
      }
}

function displayData(){
  let cartoona =`

    <div class="col-lg-8 col-md-12 d-flex align-items-end justify-content-center mt-5">
                    <div class="item d-flex align-items-center  text-white p-5 mb-4">
                        <span class="fs-48 me-4">${data.current.temp_c}<sup>o</sup>C</span>
                        <div class="info me-4 ">
                            <p class="mb-0 mt-3 fw-bold fs-32">${data.location.name}</p>
                            <p>${today.toLocaleDateString("en-GB", { weekday: "long"})}
                            ${today.toLocaleDateString("en-GB", { year: "2-digit" , month : "long"})}</p>
                        </div>
                        <span class=""><img class="w-200" src="https:${data.current.condition.icon}"></span>
                    </div>
                </div>

                <div class="col-lg-4 col-md-12 blur pt-5 px-4 ">
                   <div class="content mt-5 ">
                    <h6 class="mb-5">weather datails ...</h6>
                    <h5 class="text-white text-uppercase">thunderstorm with light drizzle</h5>
                    <div class="temp  border-bottom border-2 ">
                        <div class="icon d-flex align-items-center justify-content-between my-4">
                            <span class="text-capitalize">apparent temperature</span>
                            <span>${data.current.feelslike_c}<sup>o</sup> <i class="fas fa-temperature-full ms-3 max"></i></span>
                        </div>
                        <div class="icon d-flex align-items-center justify-content-between my-4">
                            <span class="text-capitalize">humidality</span>
                            <span>${data.current.humidity}<sup>o</sup> <i class="fas fa-droplet ms-3"></i></span>
                        </div>
                        <div class="icon d-flex align-items-center justify-content-between my-4">
                            <span class="text-capitalize">cloudy</span>
                            <span>${data.current.cloud}<sup>o</sup> <i class="fas fa-cloud ms-2"></i></span>
                        </div>
                        <div class="icon d-flex align-items-center justify-content-between my-4">
                            <span class="text-capitalize">wind degree</span>
                            <span>${data.current.wind_degree}%<i class="fas fa-wind ms-3"></i></span>
                        </div>
                        <div class="icon d-flex align-items-center justify-content-between my-4">
                            <span class="text-capitalize">wind wind direction</span>
                            <span>${data.current.wind_dir} <i class="fas fa-compass ms-3"></i></span>
                        </div>
                    </div>
                    <div class="next-day mt-4 ">
                        <div class="row">
                            <div class="col-md-6">
                              <div class="tempeature">
                                    <div class="day d-flex justify-content-between text-capitalize mb-4">
                            <span class="text-info">${tomorrow.toLocaleDateString("en-GB", {  weekday : "long"})}</span>
                            <span class="text-danger">${tomorrow.toLocaleDateString("en-GB", { day : "numeric" , month : "long"})}</span>
                        </div>
                        <div class="info text-center text-capitalize ">
                            <div class="icon"><img src="https:${data.forecast.forecastday[1].day.condition.icon}"></div>
                            <h3>${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</h3>
                            <h5>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h5>
                            <p class="text-warning">${data.forecast.forecastday[1].day.condition.text}</p>
                        </div>
                            </div>
                            </div>
                            <div class="col-md-6">
                            <div class="tempeature">
                                    <div class="day d-flex justify-content-between text-capitalize mb-4">
                            <span class="text-info">${nextTomorrow.toLocaleDateString("en-GB", {  weekday : "long"})}</span>
                            <span class="text-danger">${nextTomorrow.toLocaleDateString("en-GB", { day : "numeric" , month : "long"})}</span>
                        </div>
                        <div class="info text-center text-capitalize">
                            <div class="icon"><img src="https:${data.forecast.forecastday[2].day.condition.icon}"></div>
                            <h3>${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</h3>
                            <h5>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h5>
                            <p class="text-warning">${data.forecast.forecastday[2].day.condition.text}</p>
                        </div>
                            </div>
                            </div>
                        </div>
                    </div>
                   </div>
                </div>

   `
   rowData.innerHTML = cartoona;
}
function getLocation(){
    navigator.geolocation.getCurrentPosition(success , error);
}
function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
     coord = `${latitude},${longitude}` 
    getApi(coord);
}
function error(){
    console.log("can't to arrive to location");
    getApi("cairo");  
}
getLocation();

 
