class UICntrl {
  constructor() {
    this.mealInEL = document.querySelector('#addMeal');
    this.calInEL = document.querySelector('#addCalorie');
    this.addMealBtnEL = document.querySelector('#addMealBtn');
    this.backBtnEL = document.querySelector("#undo");
    this.clearAllBtnEL = document.querySelector("#reset");
    this.totalCalUIEL = document.querySelector('#totalCal');
    this.foodItemsGrid = document.querySelector('#foodItems');
    this.mainForm = document.querySelector('#mainForm');
  }

  addMeal = () => {
    let mealInput = this.mealInEL.value,
      calorieInput = this.calInEL.value;
    // console.log(calorieInput);

    if (mealInput === '' || calorieInput === '') {
      this.displayAlert('Enter both Meals and Calories details!!');
      return {
        "name": -1,
        "calories": -1
      }
    } else {
      this.mealInEL.value = '';
      this.calInEL.value = '';
      return {
        "name": mealInput,
        "calories": Number(calorieInput)
      }
    }
  }

  displayAlert = message => {
    M.toast({html: message, classes: 'rounded'});
  }

  paintItems = items => {
    // console.log(items);
    this.totalCalUIEL.textContent = items.TotalCal;
    let out = '';
    items.Items.forEach(item => {
      out += `
      <li class="collection-item" id=${item.id}>
      <span>${item.name} 
        <em> : ${item.calories} calories </em>
        <a href="#!" class="secondary-content">
          <i class="fa fa-pencil" aria-hidden="true">              
          </i>
        </a>
      </span>
    </li>
      `;
    }
    )
    this.foodItemsGrid.innerHTML = out;
  }

  editItemForm = item => {
    this.mealInEL.value = item.name;
    this.calInEL.value = item.calories;
    this.addMealBtnEL.style.display = "none";

    let updateButton = document.createElement('a');
    updateButton.className = 'waves-effect waves-light btn blue lighten-1';
    updateButton.id = 'updateMealBtn';
    updateButton.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</a>';
    this.mainForm.appendChild(updateButton);

    let delButton = document.createElement('a');
    delButton.className = 'waves-effect waves-light btn red lighten-1';
    delButton.id = 'delMealBtn';
    delButton.style.marginLeft = '30px';
    delButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i> Delete</a>';
    this.mainForm.appendChild(delButton);
    this.backBtnEL.style.display = "inline-block";

  }

  initForm = () => {
    this.mealInEL.value = '';
    this.calInEL.value = '';
    this.addMealBtnEL.style.display = "inline-block";
    if (document.querySelector('#delMealBtn') !== null) {
       document.querySelector('#delMealBtn').remove(); }
    if(document.querySelector('#updateMealBtn') !== null){
      document.querySelector('#updateMealBtn').remove();}
    this.backBtnEL.style.display = "none";
  }

}