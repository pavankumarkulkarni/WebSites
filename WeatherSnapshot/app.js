//Instantiate storage class
storage = new Storage;
let loc = storage.getLocation();

//Instantiate UI class
ui = new UI;

//Instantiate Weather
weather = new Weather;

ui.modalSave.addEventListener('click', (() => {
  let city = ui.modalCity.value;
  let state = ui.modalState.value;
  storage.setLocation(city, state);
  // console.log(storage.getLocation());
  loc = storage.getLocation();
  getWeather(loc.city,loc.state)
  $('#w-modal').modal('hide');
}))

function getWeather(city,state) {
 weather.getCurrentWeather(city,state)
.then(data=>{ 
  if(data.cod !== "404"){
    ui.printWeather(data);
  }else{
    ui.displayError(`City: ${city} State : ${state} --> Not found`);
  }
  })
  .catch('Error is getting weather');
}

document.addEventListener('DOMContentLoaded',getWeather(loc.city,loc.state));
document.getElementById('w-unit-imperial').addEventListener('click',()=>{
  weather.unit='imperial';
  getWeather(loc.city,loc.state);
})

document.getElementById('w-unit-metric').addEventListener('click',()=>{
  weather.unit='metric';
  getWeather(loc.city,loc.state);
})