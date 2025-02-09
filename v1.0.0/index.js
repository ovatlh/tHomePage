let timerFilterSiteList;

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

function settings(formEvent) {
  formEvent.preventDefault();
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
  const filter = input.value;
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

  await dbUtils.Update(dbUtils.DB_TABLES.SETTINGS, data);

  await setTypeOpenTab(data.typeOpenTab);
  await filterSiteList();
}

async function setTypeOpenTab(type = "new-tab") {
  const btn = document.getElementById("btnTypeOpenTab");
  let btnHtml = "open on: new tab";

  if (type != "new-tab") {
    btnHtml = "open on: same tab";
  }

  btn.innerHTML = btnHtml;
}

async function initTypeOpenTab() {
  let data = await dbUtils.ReadById(dbUtils.DB_TABLES.SETTINGS, 1);
  if (!data) {
    const newData = {
      dateTimeCreate: Date.now(),
      typeOpenTab: "new-tab",
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
  await initTypeOpenTab();
  await filterSiteList();
  await initFilterSiteList();
}

init();
