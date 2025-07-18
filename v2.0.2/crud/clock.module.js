import DB_SCHEMA from "../dbSchema.js";
import indexedDBUtils from "../../libs/utils/indexedDBUtils.js";
import tmodals from "../../libs/tmodals/v0.1.0/tmodals.module.js";
import utils from "../../libs/utils/utils.module.js";

let intervalClock;

const crudCLOCK = (function () {
  // START: SYSTEM ==========
  const itemTemplate = {
    id: 0,
    itemElement: null,
    nameElement: null,
    timeElement: null,
    buttonElement: null,
  };
  const config = {
    containerElement: null,
    listElement: null,
    clockList: [],
    clockListFilterText: "",
    dataList: [],
  };
  // END: SYSTEM ==========

  // START: CREATE ==========
  async function fnSubmitClockCreateAsync(formEvent) {
    formEvent.preventDefault();
    let data = utils.formToObject(formEvent.srcElement);
    const isFormat24H = formEvent.srcElement.querySelector(`[id="input.isFormat24H"]`);
    data.isFormat24H = isFormat24H.checked;

    await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.CLOCK.name, data);
    tmodals.fnCloseWithEscape();
    // await fnInitClockListRenderAsync();
  }

  function fnInitFormClockCreate() {
    const template = document.getElementById("templateFormClockCreate").innerHTML;
    tmodals.fnShow({
      html: template,
      isBackgroundVisible: true,
      isCloseWithBackground: true,
    });
  }
  // END: CREATE ==========

  // START: READ ==========
  async function fnClockListContainerRenderAsync(list = []) {
    // Check if list contains any items
    if(list.length === 0) {
      config.containerElement.innerHTML = `<p class="font-bold">No clocks found</p>`;
      return;
    }

    // Check if list has any changes
    if(JSON.stringify(config.dataList) !== JSON.stringify(list)) {
      config.containerElement.innerHTML = "";
      config.clockList = [];
      config.dataList = list;
      config.listElement = null;
      config.listElement = document.createElement("div");
      config.listElement.className = "item-list";
    }

    // Check if containerElement childs count is diferent from list count
    if(config.listElement.children.length !== list.length) {
      config.listElement.innerHTML = "";
      config.clockList = [];

      // Create new item elements for each clock in the list
      list.forEach((clock) => {
        const item = Object.assign({}, itemTemplate);
        item.id = clock.id;
        item.itemElement = document.createElement("div");
        item.itemElement.className = "item";
        item.nameElement = document.createElement("p");
        item.nameElement.className = "name";
        item.nameElement.textContent = clock.name;
        item.timeElement = document.createElement("p");
        item.timeElement.className = "time";
        item.timeElement.textContent = utils.timeWithUTC(item.utc, item.isFormat24H);
        item.buttonElement = document.createElement("button");
        item.buttonElement.className = "btn-icon";
        item.buttonElement.innerHTML = `<span class="material-icons">settings</span>`;
        item.buttonElement.onclick = () => fnInitFormClockUpdate(clock.id);

        // Append elements to the item
        item.itemElement.appendChild(item.nameElement);
        item.itemElement.appendChild(item.timeElement);
        item.itemElement.appendChild(item.buttonElement);

        // Append the item to the list container
        config.listElement.appendChild(item.itemElement);

        // Store the clock in the config.clockList
        config.clockList.push(item);
      });

      // Append the list container to the main container
      config.containerElement.appendChild(config.listElement);
    }

    // Update data on rendered items
    config.dataList.forEach((item, index) => {
      config.clockList[index].nameElement.textContent = item.name;
      config.clockList[index].timeElement.textContent = utils.timeWithUTC(item.utc, item.isFormat24H);
    });
  }

  async function fnInitClockListRenderAsync() {
    let list = [];
    const filterText = config.clockListFilterText;
    list = await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.CLOCK.name, filterText);
    if(!config.containerElement) {
      config.containerElement = document.getElementById("clock-list-container");
    }
    await fnClockListContainerRenderAsync(list);
  }

  async function fnInitIntervalClockList() {
    clearInterval(intervalClock);
    config.containerElement = null;
    intervalClock = setInterval(async () => {
      await fnInitClockListRenderAsync();
    }, 1000 * 0.3);
  }
  // END: READ ==========

  // START: UPDATE ==========
  async function fnSubmitClockUpdateAsync(formEvent) {
    formEvent.preventDefault();
    let data = utils.formToObject(formEvent.srcElement);
    data.id = Number(data.id); // Ensure id is a Number
    const isFormat24H = formEvent.srcElement.querySelector(`[id="input.isFormat24H"]`);
    data.isFormat24H = isFormat24H.checked;

    let clock = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CLOCK.name, data.id);
    Object.assign(clock, data); // Update the clock object with new data

    await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.CLOCK.name, clock);
    tmodals.fnCloseWithEscape();
  }

  async function fnInitFormClockUpdate(id) {
    const clock = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CLOCK.name, id);
    let template = document.getElementById("templateFormClockUpdate").innerHTML;
    template = template.replace("'OBJ_ID'", clock.id);
    tmodals.fnShow({
      html: template,
      isBackgroundVisible: true,
      isCloseWithBackground: true,
      fnRunAfter: () => {
        utils.objectToForm("formClockUpdate", clock);
      },
    });
  }
  // END: UPDATE ==========

  // START: DELETE ==========
  async function fnClockDeleteAsync(id) {
    id = Number(id); // Ensure id is a Number

    await indexedDBUtils.fnDeleteByPKAsync(DB_SCHEMA.tableDefinition.CLOCK.name, id);
    tmodals.fnCloseWithEscape();
  }
  // END: DELETE ==========

  async function fnSearchClockAsync(event) {
    const value = event.srcElement.value;

    utils.debounce(async () => {
      config.clockListFilterText = value;
    }, "fnSearchClockAsync", 300);
  }

  return {
    fnInitFormClockCreate,
    fnSubmitClockCreateAsync,
    fnClockListContainerRenderAsync,
    fnInitIntervalClockList,
    fnInitFormClockUpdate,
    fnSubmitClockUpdateAsync,
    fnClockDeleteAsync,
    fnSearchClockAsync
  };
})();

export default crudCLOCK;
