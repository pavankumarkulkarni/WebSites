const item_cntrl = new ItemCntrl;
const ui_cntrl = new UICntrl;
const ls_cntrl = new LocalStorage;

appAddMeal = () => {
  const item = ui_cntrl.addMeal();
  // console.log(item.name);
  if (item.name !== -1) {
    item_cntrl.addItem(item.name, item.calories);
    // console.log(item_cntrl.getAllItems());
    ui_cntrl.paintItems(item_cntrl.getAllItems());
  }
}

appDelAll = () => {
  item_cntrl.clearAllItems();
  ui_cntrl.paintItems(item_cntrl.getAllItems());
  ui_cntrl.initForm();
}

editItem = e => {
  if (e.target.className === 'fa fa-pencil') {
    const itemID = e.target.parentElement.parentElement.parentElement.id;
    const itemToEdit = item_cntrl.getAnItem(itemID);
    ui_cntrl.editItemForm(itemToEdit);
  }
}

appUpdateMeal = e => {
  const item = ui_cntrl.addMeal();
  if (item.name !== -1) {
    item_cntrl.editItem(item.name, item.calories);
    ui_cntrl.paintItems(item_cntrl.getAllItems());
    ui_cntrl.initForm();
  }

}

appDelItem = e => {
  const item = ui_cntrl.addMeal();
  if (item.name !== -1) {
    item_cntrl.deleteItem(item.name, item.calories);
    ui_cntrl.paintItems(item_cntrl.getAllItems());
    ui_cntrl.initForm();
  }
}

appundoEdit = e=>{
  ui_cntrl.initForm();
  item_cntrl.undoEdit();
}

btnClick = e => {
  if (e.target.id === 'addMealBtn') {
    appAddMeal();
  } else if (e.target.id === 'updateMealBtn') {
    appUpdateMeal();
  } else if (e.target.id === 'delMealBtn') {
    appDelItem();
  }else if (e.target.id === 'undo') {
    appundoEdit();
  }
}

appRefreshPage = e => {
  item_cntrl.loadFromDb();
  ui_cntrl.paintItems(item_cntrl.getAllItems());
  ui_cntrl.initForm();  
}
// ui_cntrl.addMealBtnEL.addEventListener('click', appAddMeal);
ui_cntrl.clearAllBtnEL.addEventListener('click', appDelAll);
ui_cntrl.foodItemsGrid.addEventListener('click', editItem);
ui_cntrl.mainForm.addEventListener('click', btnClick);
document.addEventListener('DOMContentLoaded', appRefreshPage);
