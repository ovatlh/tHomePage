import DB_SCHEMA from "../dbSchema.js";
import indexedDBUtils from "../../libs/utils/indexedDBUtils.js";
import tmodals from "../../libs/tmodals/v0.1.0/tmodals.module.js";
import utils from "../../libs/utils/utils.module.js";

let intervalClock;

const crudCLOCK = (function () {
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
    let clockHTML = `<p class="font-bold">No clocks found</p>`;

    if(list.length > 0) {
      const clockITEMS = list.reduce((html, item) => {
        return html + `
          <div class="item">
            <p class="name">${item.name}</p>
            <p class="time">${utils.timeWithUTC(item.utc, item.isFormat24H)}</p>
            <button class="btn-icon" onclick="crud.clock.fnInitFormClockUpdate(${item.id})">
              <span class="material-icons">settings</span>
            </button>
          </div>
        `;
      }, "");
      clockHTML = `
        <div class="item-list">
          ${clockITEMS}
        </div>
      `;
    }

    document.getElementById("clock-list-container").innerHTML = clockHTML;
  }

  async function fnInitClockListRenderAsync(filterText = "") {
    let list = [];
    list = await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.CLOCK.name, filterText);
    await fnClockListContainerRenderAsync(list);
  }

  async function fnInitIntervalClockList() {
    clearInterval(intervalClock);
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

  return {
    fnInitFormClockCreate,
    fnSubmitClockCreateAsync,
    fnClockListContainerRenderAsync,
    fnInitIntervalClockList,
    fnInitFormClockUpdate,
    fnSubmitClockUpdateAsync,
    fnClockDeleteAsync,
  };
})();

export default crudCLOCK;
