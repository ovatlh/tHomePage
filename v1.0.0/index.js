let timerFilterSiteList;
let timerFilterClockList;
let timerClockList;

async function downloadDB() {
  const json = await dbUtils.exportIndexedDBToJSON();
  const fileName = `${dbUtils.DB_NAME}.${Date.now()}.json`;
  utils.downloadJSON(json, fileName);
}

async function importDB() {
  const input = document.getElementById("settings.importdb");
  const file = input.files[0];
  if (!file) {
    sweetalert2Utils.showToast("Select json file");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const json = e.target.result;
      await dbUtils.importJSONToIndexedDB(json);
      await filterSiteList();
      await renderSearchEngineSelect();
      await initSearchEngineSelect();
      sweetalert2Utils.showToast("data imported");
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(file);
}

async function showSettings() {
  const template = document.getElementById("templateFormSettings").innerHTML;
  sweetalert2Utils.showModal("Settings", template);
}

async function deleteSearchEngine(id) {
  id = Number(id);
  await dbUtils.DeleteById(dbUtils.DB_TABLES.SEARCHENGINE, id);
  await renderSearchEngineList();
  await renderSearchEngineSelect();
}

async function renderSearchEngineList() {
  let searchEngineHtml = "<h6>Loading...</h6>";
  document.getElementById("search-engine-list-container").innerHTML = searchEngineHtml;

  const list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SEARCHENGINE);
  if(list.length > 0){
    searchEngineHtml = list.reduce((html, item) => {
      return (
        html +
        `
          <button type="button" class="searchengine-item" onclick="deleteSearchEngine(${item.id})">
            <p class="name">${item.name}</p>
            <p class="url">${item.url}</p>
          </button>
        `
      );
    }, "");
  } else {
    searchEngineHtml = "<h6>No items</h6>";
  }

  document.getElementById("search-engine-list-container").innerHTML = searchEngineHtml;
}

async function renderSearchEngineSelect() {
  let searchEngineHtml = `<option value="">Loading...</option>`;
  document.getElementById("search.engine").innerHTML = searchEngineHtml;

  const list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SEARCHENGINE);
  if(list.length > 0){
    searchEngineHtml = list.reduce((html, item) => {
      return (
        html +
        `
          <option value="${item.url}">${item.name}</option>
        `
      );
    }, "");
  } else {
    searchEngineHtml = `<option value="">No items</option>`;
  }

  document.getElementById("search.engine").innerHTML = searchEngineHtml;
}

async function initSearchEngineSelect() {
  const settings = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  document.getElementById("search.engine").value = settings.searchEngine;
}

async function setSearchEngine(event) {
  const value = event.srcElement.value;
  const settings = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  settings.searchEngine = value;
  await dbUtils.Update(dbUtils.DB_TABLES.SETTINGS, settings);
}

async function searchEngine(formEvent) {
  formEvent.preventDefault();
  const data = utils.formToObject(formEvent.srcElement);
  await dbUtils.Create(dbUtils.DB_TABLES.SEARCHENGINE, data);
  await renderSearchEngineList();
  await renderSearchEngineSelect();
  formEvent.srcElement.reset();
}

async function showSearchEngines() {
  const template = document.getElementById("templateFormSearchEngine").innerHTML;
  sweetalert2Utils.showModal("Seach engines", template, () => {
    renderSearchEngineList();
  }, () => {
    showSettings();
  });
}

async function searchOnPage(value = "") {
  const selectDOM = document.getElementById("search.engine");
  const engine = selectDOM.options[selectDOM.selectedIndex].value;
  if(engine.length > 0) {
    const searchURL = engine + encodeURIComponent(value);
    const settings = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
    if(settings && settings.typeOpenTab == "new-tab") {
      window.open(searchURL, "_blank");
    } else {
      window.location.href = searchURL;
    }
  } else {
    sweetalert2Utils.showToast("No search engines");
  }
}

async function searchPage(formEvent) {
  formEvent.preventDefault();
  const data = utils.formToObject(formEvent.srcElement);
  searchOnPage(data.search.trim());
}

async function renderClockList(list = []) {
  let clockHtml = "<h6>Loading...</h6>";
  document.getElementById("clock-item-list-container").innerHTML = clockHtml;

  if(list.length > 0) {
    clockHtml = list.reduce((html, item) => {
      const timeResult = utils.timeWithUTC(item.utc, item.format24H);
      return (
        html +
        `
        <div class="clock-item">
          <p class="time">${timeResult}</p>
          <p class="name">${item.name}</p>
          <button onclick="showClockUpdate(${item.id})">Edit</button>
        </div>
        `
      );
    }, "");
  } else {
    clockHtml = "<h6>No items<h6>";
  }

  document.getElementById("clock-item-list-container").innerHTML = clockHtml;
}

async function filterClockList() {
  const input = document.getElementById("clock.search");
  const filter = input.value.trim();
  let list = [];
  if(filter.length > 0) {
    list = await dbUtils.ReadAll(dbUtils.DB_TABLES.CLOCK, filter);
  } else {
    list = await dbUtils.ReadAll(dbUtils.DB_TABLES.CLOCK);
  }
  await renderClockList(list);
}

async function initFilterClockList() {
  timerClockList = setInterval(async () => {
    await filterClockList();
  }, 1000 * 0.3);
}

async function clockDelete(id) {
  id = Number(id);
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.CLOCK, id);

  sweetalert2Utils.showDialog({
    title: `¿Delete ${data.name}?`,
    okText: "Delete",
    fnOk: async () => {
      await dbUtils.DeleteById(dbUtils.DB_TABLES.CLOCK, id);
      sweetalert2Utils.showToast(`clock ${data.name} deleted`);
    },
  });
}

async function clockUpdate(formEvent) {
  formEvent.preventDefault();
  const data = utils.formToObject(formEvent.srcElement);
  const inputFormat24H = formEvent.srcElement.querySelector(`[id="input.format24H"]`);
  data.format24H = inputFormat24H.checked;
  data.id = Number(data.id);

  await dbUtils.Update(dbUtils.DB_TABLES.CLOCK, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("clock updated");
}

async function clockCreate(formEvent) {
  formEvent.preventDefault();
  let data = utils.formToObject(formEvent.srcElement);
  const inputFormat24H = formEvent.srcElement.querySelector(`[id="input.format24H"]`);
  data.format24H = inputFormat24H.checked;
  data.dateTimeCreate = Date.now();

  await dbUtils.Create(dbUtils.DB_TABLES.CLOCK, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("clock created");
  await filterClockList();
}

async function showClockUpdate(id) {
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.CLOCK, id);
  let template = document.getElementById("templateFormClockUpdate").innerHTML;
  template = template.replace("'dataId'", data.id);
  sweetalert2Utils.showModal("Edit clock", template, () => {
    utils.objectToForm("formClockUpdate", data);
  });
}

async function showClockCreate() {
  const template = document.getElementById("templateFormClockCreate").innerHTML;
  sweetalert2Utils.showModal("Add new clock", template);
}

async function siteDelete(id) {
  id = Number(id);
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SITE, id);

  sweetalert2Utils.showDialog({
    title: `¿Delete ${data.name}?`,
    okText: "Delete",
    fnOk: async () => {
      await dbUtils.DeleteById(dbUtils.DB_TABLES.SITE, id);
      sweetalert2Utils.showToast(`site ${data.name} deleted`);
      await filterSiteList();
    },
  });
}

async function siteUpdate(formEvent) {
  formEvent.preventDefault();
  const data = utils.formToObject(formEvent.srcElement);
  data.id = Number(data.id);

  await dbUtils.Update(dbUtils.DB_TABLES.SITE, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("site updated");
  await filterSiteList();
}

async function siteCreate(formEvent) {
  formEvent.preventDefault();
  let data = utils.formToObject(formEvent.srcElement);
  data.dateTimeCreate = Date.now();

  await dbUtils.Create(dbUtils.DB_TABLES.SITE, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("site created");
  await filterSiteList();
}

async function showSiteUpdate(id) {
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SITE, id);
  let template = document.getElementById("templateFormSiteUpdate").innerHTML;
  template = template.replace("'dataId'", data.id);
  sweetalert2Utils.showModal("Edit site", template, () => {
    utils.objectToForm("formSiteUpdate", data);
  });
}

function showSiteCreate() {
  const template = document.getElementById("templateFormSiteCreate").innerHTML;
  sweetalert2Utils.showModal("Add new site", template);
}

async function renderSiteList(list = []) {
  let siteHtml = "<h6>Loading...</h6>";
  document.getElementById("site-item-list-container").innerHTML = siteHtml;
  await utils.asyncDelay(1);
  const settings = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);

  if (list.length > 0) {
    // list = utils.sortByProperty(list, "dateTimeCreate");
    //https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=64
    siteHtml = list.reduce((html, item) => {
      let itemTitle = `${item.name}`;
      if (item.description.length > 0) {
        itemTitle += `: ${item.description}`;
      }
      if (item.tags.length > 0) {
        itemTitle += ` [${item.tags}]`;
      }
      let aTarget = "_blank";
      if (settings.typeOpenTab != "new-tab") {
        aTarget = "";
      }
      return (
        html +
        `
        <div class="site-item">
          <a href="${item.url}" target="${aTarget}" title="${itemTitle}">
          <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64" alt="${item.name}">
          <p>${item.name}</p>
          </a>
          <button onclick="showSiteUpdate(${item.id})">Edit</button>
        </div>
      `
      );
    }, "");
  } else {
    siteHtml = "<h6>No items<h6>";
  }

  document.getElementById("site-item-list-container").innerHTML = siteHtml;
}

async function filterSiteList() {
  const input = document.getElementById("site.search");
  const filter = input.value.trim();
  let list = [];
  clearTimeout(timerFilterSiteList);
  timerFilterSiteList = setTimeout(async () => {
    if (filter.length > 0) {
      list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SITE, filter);
    } else {
      list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SITE);
    }
    await renderSiteList(list);
  }, 1000 * 0.5);
}

async function initFilterSiteList() {
  const input = document.getElementById("site.search");
  input.addEventListener("input", filterSiteList);
}

async function toggleTypeOpenTab() {
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  if (!data) {
    return;
  }

  if (data.typeOpenTab == "new-tab") {
    data.typeOpenTab = "same-tab";
  } else {
    data.typeOpenTab = "new-tab";
  }

  await filterSiteList();
  await dbUtils.Update(dbUtils.DB_TABLES.SETTINGS, data);

  await setTypeOpenTab(data.typeOpenTab);
}

async function setTypeOpenTab(type = "new-tab") {
  const btn = document.getElementById("btnTypeOpenTab");
  let btnHtml = "open on: new tab";

  if (type != "new-tab") {
    btnHtml = "open on: same tab";
  }

  btn.innerHTML = btnHtml;
}

async function initSettings() {
  let data = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  if (!data) {
    const newData = {
      dateTimeCreate: Date.now(),
      typeOpenTab: "new-tab",
      searchEngine: "",
    };
    await dbUtils.Create(dbUtils.DB_TABLES.SETTINGS, newData);
    data = newData;
  }
  await setTypeOpenTab(data.typeOpenTab);
}

async function focusSearch() {
  document.getElementById("search.page").focus();
}

async function init() {
  await focusSearch();
  await utils.asyncDelay(0.5);
  await initSettings();
  await filterSiteList();
  await filterClockList();
  await initFilterSiteList();
  await initFilterClockList();
  await renderSearchEngineSelect();
  await initSearchEngineSelect();
}

init();
