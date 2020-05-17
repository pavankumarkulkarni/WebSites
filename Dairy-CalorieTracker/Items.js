class ItemCntrl {
  constructor() {
    this.Items = [];
    this.currentItem = null;
    this.totalCalories = 0;
    this.currID = 0;
    this.ls_cntrl = new LocalStorage;
  }

  addItem = function (name, calories) {
    // update total calories
    this.totalCalories += calories;

    //create Item object and push it to list
    let item = {
      "id": `item${this.currID}`,
      "name": name,
      "calories": calories
    };
    this.Items.push(item);

    //Add to local storage as well;
    this.ls_cntrl.updateItemLS(this.Items, this.totalCalories);

    //increment the id for next item to be added.
    this.currID += 1;
  }

  getAnItem = function (itemID) {
    let itemToEdit = -1;
    this.Items.forEach((item) => {
      if (item.id === itemID) {
        this.currentItem = item.id;
        itemToEdit = {
          "id": item.id,
          "name": item.name,
          "calories": item.calories
        };
      }
    })
    return itemToEdit;
  }

  // Edit item.. 
  // update new item name, new calories
  // update total calories by removing earlier calories and adding back new calories
  editItem = function (newName, newCalories) {
    this.Items.forEach((item) => {
      if (item.id === this.currentItem) {
        item.name = newName;
        this.totalCalories -= item.calories;
        item.calories = newCalories;
        this.totalCalories += item.calories;
        this.currentItem = null;
        //Add to local storage as well;
        this.ls_cntrl.updateItemLS(this.Items, this.totalCalories);
      }
    })
  }

  loadFromDb = () => {
    let db = this.ls_cntrl.refreshPage();
    this.Items = db.Items;
    this.totalCalories = db.totalCalories;
    this.currentItem = null;
    let lastItem = this.Items[this.Items.length - 1];
    // console.log(lastItem);
    if (lastItem === undefined) {
      this.currID = 0;
    }
    else {
      let id = lastItem.id;
      this.currID = Number(id.substr(4, id)) + 1;
    }
  }

  //Delete an item by itemid. Reduce item calories from total calories.
  deleteItem = function () {
    this.Items.forEach((item, index) => {
      if (item.id === this.currentItem) {
        this.totalCalories -= item.calories;
        this.Items.splice(index, 1);
        this.currentItem = null;
        //Add to local storage as well;
        this.ls_cntrl.updateItemLS(this.Items, this.totalCalories);
      }
    })
  }

  // Use constructor method to clear all items, id counter and calories
  clearAllItems = () => {
    this.Items = [];
    this.currentItem = null;
    this.totalCalories = 0;
    this.currID = 0;
    //Add to local storage as well;
    this.ls_cntrl.updateItemLS(this.Items, this.totalCalories);
  }

  getAllItems = () => {
    return {
      "Items": this.Items,
      "TotalCal": this.totalCalories
    }
  }

  undoEdit = () => this.currentItem = null;

}