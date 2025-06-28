import DB_SCHEMA from "../dbSchema.js";
import indexedDBUtils from "../../libs/utils/indexedDBUtils.js";
import tmodals from "../../libs/tmodals/v0.1.0/tmodals.module.js";
import utils from "../../libs/utils/utils.module.js";

const crudSITE = (function () {
  // START: CREATE ==========
  async function fnSubmitSiteCreateAsync(formEvent) {
    formEvent.preventDefault();
    let data = utils.formToObject(formEvent.srcElement);

    await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.SITE.name, data);
    tmodals.fnCloseWithEscape();
    await fnInitSiteListRenderAsync();
  }

  function fnInitFormSiteCreate() {
    const template = document.getElementById("templateFormSiteCreate").innerHTML;
    tmodals.fnShow({
      html: template,
      isBackgroundVisible: true,
      isCloseWithBackground: true,
    });
  }
  // END: CREATE ==========

  // START: READ ==========
  async function fnSiteListContainerRenderAsync(list = [], openSiteMode = "new-tab") {
    let siteHTML = `<p class="font-bold">No sites found</p>`;

    if(list.length > 0) {
      const groups = utils.arrayToGroupedArray(list, "groupName");
      siteHTML = groups.reduce((htmlAllGroup, group) => {
        let itemListHTML = group.itemList.reduce((htmlItemList, item) => {
          let title = item.name;
          if(item.description.length > 0) {
            title += `: ${item.description}`;
          }
          if(item.tags.length > 0) {
            title += ` [${item.tags}]`;
          }
          let aTarget = "_blank";
          if(openSiteMode !== "new-tab") {
            aTarget = "";
          }

          return (
            htmlItemList +
            `
              <div class="item">
                <a href="${item.url}" target="${aTarget}" title="${title}">
                  <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64" alt="${item.name}">
                  <p>${item.name}</p>
                </a>
                <button class="btn-icon" onclick="crud.site.fnInitFormSiteUpdate(${item.id})">
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

  async function fnInitSiteListRenderAsync(openSiteMode = "new-tab") {
    let list = [];
    list = await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.SITE.name);
    await fnSiteListContainerRenderAsync(list, openSiteMode);
  }
  // END: READ ==========

  // START: UPDATE ==========
  async function fnSubmitSiteUpdateAsync(formEvent) {
    formEvent.preventDefault();
    let data = utils.formToObject(formEvent.srcElement);
    data.id = Number(data.id); // Ensure id is a Number

    let site = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.SITE.name, data.id);
    Object.assign(site, data); // Update the site object with new data

    await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.SITE.name, site);
    tmodals.fnCloseWithEscape();
    await fnInitSiteListRenderAsync();
  }

  async function fnInitFormSiteUpdate(id) {
    const site = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.SITE.name, id);
    let template = document.getElementById("templateFormSiteUpdate").innerHTML;
    template = template.replace("'OBJ_ID'", site.id);
    tmodals.fnShow({
      html: template,
      isBackgroundVisible: true,
      isCloseWithBackground: true,
      fnRunAfter: () => {
        utils.objectToForm("formSiteUpdate", site);
      }
    });
  }
  // END: UPDATE ==========

  // START: DELETE ==========
  async function fnSiteDeleteAsync(id) {
    id = Number(id); // Ensure id is a Number
    
    await indexedDBUtils.fnDeleteByPKAsync(DB_SCHEMA.tableDefinition.SITE.name, id);
    tmodals.fnCloseWithEscape();
    await fnInitSiteListRenderAsync();
  }
  // END: DELETE ==========

  async function fnSetSiteOpenModeAsync(openSiteMode = "new-tab") {
    const btn = document.getElementById("btn-site-open-mode");
    btn.title = "new tab";
    btn.dataset.iconActive = 1;

    if(openSiteMode !== "new-tab") {
      btn.dataset.iconActive = 2;
      btn.title = "same tab";
    }

    await fnInitSiteListRenderAsync(openSiteMode);
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

    await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, config);

    await fnSetSiteOpenModeAsync(config.openSiteMode);
  }

  return {
    fnSiteDeleteAsync,
    fnSubmitSiteUpdateAsync,
    fnInitFormSiteUpdate,
    fnSiteListContainerRenderAsync,
    fnInitSiteListRenderAsync,
    fnSubmitSiteCreateAsync,
    fnInitFormSiteCreate,
    fnSetSiteOpenModeAsync,
    fnInitOpenSiteModeAsync,
  };
})();

export default crudSITE;
