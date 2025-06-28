import DB_SCHEMA from "./dbSchema.js";
import indexedDBUtils from "../libs/utils/indexedDBUtils.js";
import tmodals from "../libs/tmodals/v0.1.0/tmodals.module.js";
window.tmodals = tmodals;
import utils from "../libs/utils/utils.module.js";

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

function fnInitSettings() {
  const template = document.getElementById("templateFormSettings").innerHTML;
  tmodals.fnShow({
    html: template,
    isBackgroundVisible: true,
    isCloseWithBackground: true,
  });
}
window.fnInitSettings = fnInitSettings;

async function fnSetSiteOpenModeAsync(type = "new-tab") {
  const btn = document.getElementById("btn-site-open-mode");
  btn.title = "new tab";
  btn.dataset.iconActive = 1;

  if(type !== "new-tab") {
    btn.dataset.iconActive = 2;
    btn.title = "same tab";
  }
}

async function fnInitOpenSiteModeAsync() {
  const config = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CONFIG.name, 1);
  if(!config) {
    return;
  }

  if(config.openSiteMode == "new-tab") {
    config.openSiteMode = "same-tab";
  } else {
    config.openSiteMode = "new-tab";
  }

  // await filterSiteList();
  await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, config);

  await fnSetSiteOpenModeAsync(config.openSiteMode);
}
window.fnInitOpenSiteModeAsync = fnInitOpenSiteModeAsync;

async function fnSubmitSiteCreate(formEvent) {
  formEvent.preventDefault();
  let data = utils.formToObject(formEvent.srcElement);
  data.dateTimeCreate = Date.now();

  await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.SITE.name, data);
  tmodals.fnCloseWithEscape();
  await fnInitSiteListRenderAsync();
}
window.fnSubmitSiteCreate = fnSubmitSiteCreate;

function fnInitSiteCreate() {
  const template = document.getElementById("templateFormSiteCreate").innerHTML;
  tmodals.fnShow({
    html: template,
    isBackgroundVisible: true,
    isCloseWithBackground: true,
  });
}
window.fnInitSiteCreate = fnInitSiteCreate;

async function fnRenderSiteListContainer(list = []) {
  let siteHTML = `<p class="font-bold">No sites found</p>`;

  const settings = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CONFIG.name, 1);

  if(list.length > 0) {
    const groups = utils.arrayToGroupedArray(list, "group");
    siteHTML = groups.reduce((htmlAllGroup, group) => {
      let itemListHTML = group.itemList.reduce((htmlItemList, item) => {
        let itemTitle = item.name;
        if(item.description.length > 0) {
          itemTitle += `: ${item.description}`;
        }
        if(item.tags.length > 0) {
          itemTitle += ` [${item.tags}]`;
        }
        let aTarget = "_blank";
        if(settings.openSiteMode !== "new-tab") {
          aTarget = "";
        }

        return (
          htmlItemList +
          `
            <div class="item">
              <a href="${item.url}" target="${aTarget}" title="${itemTitle}">
                <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64" alt="${item.name}">
                <p>${item.name}</p>
              </a>
              <button class="btn-icon" onclick="fnInitSiteUpdate(${item.id})">
                <span class="material-icons">settings</span>
              </button>
            </div>
          `
        );
      }, "");

      let groupHTML = `
        <div class="group"> 
          <p class="font-bold">${group.name}</p>
          <div class="item-list">
            ${itemListHTML}
          </div>
        </div>
      `;

      return(
        htmlAllGroup +
        groupHTML
      )
    }, "");
  }

  document.getElementById("site-list-container").innerHTML = siteHTML;
}

async function fnInitConfigAsync() {
  const config = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CONFIG.name, 1);
  if(!config) {
    const data = {
      dateTimeCreated: Date.now(),
      openSiteMode: "new-tab",
    };
    await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, data);
  }
}

async function fnInitSiteListRenderAsync() {
  let list = [];
  list = await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.SITE.name);
  await fnRenderSiteListContainer(list);
}

async function fnInit() {
  await indexedDBUtils.fnInitDBAsync(DB_SCHEMA);
  await fnInitConfigAsync();
  await fnInitOpenSiteModeAsync();
  await fnInitSiteListRenderAsync();
}

fnInit();