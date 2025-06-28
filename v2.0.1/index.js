window.libs = window.libs || {};
window.crud = window.crud || {};

import DB_SCHEMA from "./dbSchema.js";
import indexedDBUtils from "../libs/utils/indexedDBUtils.js";
import tmodals from "../libs/tmodals/v0.1.0/tmodals.module.js";
window.libs.tmodals = tmodals;
import utils from "../libs/utils/utils.module.js";

// START: CRUDs ==========
import crudSITE from "./crud/site.module.js";
window.crud.site = crudSITE;
import  crudCONFIG from "./crud/config.module.js";
window.crud.config = crudCONFIG;
import crudCLOCK from "./crud/clock.module.js";
window.crud.clock = crudCLOCK;
// END: CRUDs ==========

//#region indexedDB
async function fnInitDownloadDB() {
  const json = await indexedDBUtils.fnExporToJsonAsync();
  const fileName = `${DB_SCHEMA.name}.${Date.now()}.json`;
  utils.downloadJSON(json, fileName);
}
window.fnInitDownloadDB = fnInitDownloadDB;

async function fnInitImportDB() {
  const input = document.getElementById("importdb");
  const file = input.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const json = e.target.result;
      const result = await indexedDBUtils.fnImporFromJsonAsync(json);
      if(result) {
        tmodals.fnShow({
          html: `<p class="font-bold color-black">Database imported successfully!</p>`,
          isBackgroundVisible: true,
          isCloseWithBackground: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(file);
}
window.fnInitImportDB = fnInitImportDB;
//#endregion

async function fnInit() {
  await indexedDBUtils.fnInitDBAsync(DB_SCHEMA);
  await crudCONFIG.fnInitConfigAsync();
  await crudSITE.fnInitSiteListRenderAsync();
  await crudCLOCK.fnInitIntervalClockList();
}

fnInit();
