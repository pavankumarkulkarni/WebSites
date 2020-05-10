class Weather {
  constructor() {
    this.api_key = 'fce63677bec3ef3098c5c4bfdb66c901';
    this.unit='imperial';
  }


  async getCurrentWeather(city, state) {
    let response, resJSON;
    response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},USA&units=${this.unit}&appid=${this.api_key}`);
    resJSON = await response.json();
    return resJSON;
  }
}