async function renderData() {
  let list = await dbUtils.fnReadAll(dbUtils.DB_TABLES.USER);
  list = utils.sortByProperty(list, "dateTimeCreate");
  document.getElementById("pre").textContent = JSON.stringify(list, undefined, 2);
}

function addUser(formEvent) {
  formEvent.preventDefault();
  var userObj = utils.formToObject(formEvent.srcElement);
  userObj.dateTimeCreate = Date.now();
  // console.log(formEvent);
  // console.log(userObj);

  dbUtils.fnCreate(dbUtils.DB_TABLES.USER, userObj);
  formEvent.srcElement.reset();
  renderData();
}

renderData();
