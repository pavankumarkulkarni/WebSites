class Storage{

  setLocation(city, state){
    let change_loc = {"city": city, "state": state};
    localStorage.setItem('location', JSON.stringify(change_loc));
  }

  getLocation(){
    return JSON.parse(localStorage.getItem('location'));
  }
}