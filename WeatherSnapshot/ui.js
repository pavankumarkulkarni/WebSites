//UI class

class UI {
  constructor() {
    this.modalCity = document.getElementById('w-city');
    this.modalState = document.getElementById('w-state');
    this.modalSave = document.getElementById('w-save-changes');
    this.modalClose = document.getElementById('w-close');
    this.modalWindow = document.querySelector('.modal');
    this.mainLocation = document.getElementById('w-loc');
    this.mainHumidity = document.getElementById('w-humidity');
    this.mainTemp = document.getElementById('w-temperature');
    this.mainFeels = document.getElementById('w-feelslike');
    this.mainWind = document.getElementById('w-wind');
    this.mainDesc = document.getElementById('desc');
    this.mainTime = document.getElementById('time');
    this.icon_url='http://openweathermap.org/img/w/';
    this.icon = document.getElementById('w-icon');
  }

  printWeather(data) {
    if(document.getElementById('errMSG') != null){
      document.getElementById('errMSG').remove();
    }
    this.mainLocation.textContent = data.name;
    this.mainHumidity.textContent = `Humidity : ${data.main.humidity} %`;
    this.mainTemp.textContent = `Temperature : ${data.main.temp}`;
    this.mainFeels.textContent = `Feels-like : ${data.main.feels_like}`;
    this.mainWind.textContent = `Wind Speed/Gust: ${data.wind.speed}/${data.wind.gust}`;            
    this.mainDesc.textContent = `${data.weather[0].main} : ${data.weather[0].description}`; 
    this.mainTime.textContent = `${Date(data.dt)}`;
    this.icon.setAttribute("src",`${this.icon_url}${data.weather[0].icon}.png`)
  }

  displayError(msg){
    let errDiv = document.createElement('div');
    errDiv.setAttribute('id','errMSG');
    errDiv.innerHTML = `
    <div class="alert alert-danger mt-2" role="alert">
  ${msg} !! Please change location.
</div>
    `;
    document.getElementById('w-container').appendChild(errDiv);
    this.mainLocation.textContent = '';
    this.mainHumidity.textContent = '';
    this.mainTemp.textContent = '';
    this.mainFeels.textContent = '';
    this.mainWind.textContent = '';            
    this.mainDesc.textContent = ''; 
    this.mainTime.textContent = '';    
    this.icon.setAttribute("src",'');
  }

}