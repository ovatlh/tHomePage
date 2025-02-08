async function renderData() {
  await renderSiteList();
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

async function renderSiteList() {
  document.getElementById("site-item-list-container").innerHTML = "<h6>Loading...</h6>";

  await utils.asyncDelay(1);
  let list = await dbUtils.ReadAll(dbUtils.DB_TABLES.SITE);

  if(list.length > 0) {
    // list = utils.sortByProperty(list, "dateTimeCreate");
    //https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=64
    const siteListHTML = list.reduce((html, item) => {
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

    document.getElementById("site-item-list-container").innerHTML = siteListHTML;
  }
}

function showSiteCreate() {
  const template = document.getElementById("templateFormSiteCreate");
  sweetalert2Utils.showModal("Add new site", template.innerHTML);
}

async function showSiteUpdate(id) {
  const data = await dbUtils.ReadById(dbUtils.DB_TABLES.SITE, id);
  const template = document.getElementById("templateFormSiteUpdate");
  sweetalert2Utils.showModal("Edit site", template.innerHTML, () => {
    utils.objectToForm("formSiteUpdate", data);
  });
}

function focusSearch() {
  document.getElementById("search.page").focus();
}

function init() {
  focusSearch();
  renderData();
}

init();
