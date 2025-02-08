async function siteDelete(id) {
  id = Number(id);
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SITE, id);

  sweetalert2Utils.showDialog({
    title: `¿Delete ${data.name}?`,
    okText: "Delete",
    fnOk: async () => {
      await dbUtils.DeleteById(dbUtils.DB_TABLES.SITE, id);
      sweetalert2Utils.showToast(`site ${data.name} deleted`);
      await renderSiteList();
    }
  });
}

async function siteUpdate(formEvent) {
  formEvent.preventDefault();
  const data = utils.formToObject(formEvent.srcElement);
  data.id = Number(data.id);

  await dbUtils.Update(dbUtils.DB_TABLES.SITE, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("site updated");
  await renderSiteList();
}

async function siteCreate(formEvent) {
  formEvent.preventDefault();
  let data = utils.formToObject(formEvent.srcElement);
  data.dateTimeCreate = Date.now();

  await dbUtils.Create(dbUtils.DB_TABLES.SITE, data);
  sweetalert2Utils.close();
  sweetalert2Utils.showToast("site created");
  await renderSiteList();
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

async function renderSiteList() {
  let siteHtml = "<h6>Loading...</h6>";
  document.getElementById("site-item-list-container").innerHTML = siteHtml;

  await utils.asyncDelay(0.5);
  let list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SITE);

  if(list.length > 0) {
    // list = utils.sortByProperty(list, "dateTimeCreate");
    //https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=64
    siteHtml = list.reduce((html, item) => {
      let itemTitle = `${item.name}`;
      if(item.description.length > 0) {
        itemTitle += `: ${item.description}`;
      }
      if(item.tags.length > 0) {
        itemTitle += ` [${item.tags}]`;
      }
      return html + `
        <div class="site-item">
          <a href="${item.url}" target="_blank" title="${itemTitle}">
          <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64" alt="${item.name}">
          <p>${item.name}</p>
          </a>
          <button onclick="showSiteUpdate(${item.id})">Edit</button>
        </div>
      `;
    }, "");
  } else {
    siteHtml = "<h6>No items<h6>";
  }

  document.getElementById("site-item-list-container").innerHTML = siteHtml;
}

function focusSearch() {
  document.getElementById("search.page").focus();
}

async function renderData() {
  await renderSiteList();
}

function init() {
  focusSearch();
  renderData();
}

init();
