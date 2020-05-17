class LocalStorage{
  constructor(){
    if(localStorage.getItem('db')===null){
      localStorage.setItem('db',JSON.stringify({
        "Items" : [],
        // "currentItem" : null,
        "totalCalories" : 0,
        // "currID" :0
      }));
    }
  }

  updateItemLS = function(items, totalCal){
    let itemsLS = {
      "Items" : items,
      "totalCalories": totalCal
    }
    localStorage.setItem('db', JSON.stringify(itemsLS));
  }

  refreshPage = ()=> {
    return JSON.parse(localStorage.getItem('db'));
  }


}