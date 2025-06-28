import DB_SCHEMA from "./dbSchema.js";
import indexedDBUtils from "../libs/utils/indexedDBUtils.js";
import tmodals from "../libs/tmodals/v0.1.0/tmodals.module.js";
import utils from "../libs/utils/utils.module.js";

async function fnInitDownloadDB() {
  const json = await dbUtils.exportIndexedDBToJSON();
  const fileName = `${dbUtils.DB_NAME}.${Date.now()}.json`;
  utils.downloadJSON(json, fileName);
}

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
      await dbUtils.importJSONToIndexedDB(json);
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(file);
}

async function fnInitSettings() {
  const template = document.getElementById("templateFormSettings").innerHTML;
  tmodals.fnShow({
    html: template,
    isBackgroundVisible: true,
    isCloseWithBackground: true,
  });

}

async function fnSetSiteOpenMode(type = "new-tab") {
  const btn = document.getElementById("btn-site-open-mode");
  btn.title = "new tab";
  btn.dataset.iconActive = 1;

  if(type !== "new-tab") {
    btn.dataset.iconActive = 2;
    btn.title = "same tab";
  }
}

async function fnInitSiteOpenMode() {
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  if(!data) {
    return;
  }

  if(data.typeOpenTab == "new-tab") {
    data.typeOpenTab = "same-tab";
  } else {
    data.typeOpenTab = "new-tab";
  }

  // await filterSiteList();
  await dbUtils.Update(dbUtils.DB_TABLES.SETTINGS, data);

  await fnSetSiteOpenMode(data.typeOpenTab);
}

async function fnSubmitSiteCreate(formEvent) {
  formEvent.preventDefault();
  let data = utils.formToObject(formEvent.srcElement);
  data.dateTimeCreate = Date.now();

  await dbUtils.Create(dbUtils.DB_TABLES.SITE, data);
  tmodals.fnClose();
}

function fnInitSiteCreate() {
  const template = document.getElementById("templateFormSiteCreate").innerHTML;
  tmodals.fnShow({
    html: template,
    isBackgroundVisible: true,
    isCloseWithBackground: true,
  });
}

async function fnRenderSiteListContainer(list = []) {
  let siteHTML = `<p class="font-bold">No sites found</p>`;

  const settings = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CONFIG.name, 1);
  await utils.asyncDelay(1);

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
        if(settings.typeOpenTab !== "new-tab") {
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

async function fnInit() {
  await indexedDBUtils.fnInitDBAsync(DB_SCHEMA);

  let list = [];
  list = await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.SITE.name);

  await fnRenderSiteListContainer(list);
}

fnInit();