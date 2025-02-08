async function renderSiteList() {
  let list = await dbUtils.fnReadAll(dbUtils.DB_TABLES.SITE);

  if(list.length > 0) {
    // list = utils.sortByProperty(list, "dateTimeCreate");
    //https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=64
    const siteListHTML = list.reduce((html, item) => {
      return html + `
        <a class="site-item" href="${item.url}" target="_blank" title="${item.description}: [${item.tags}]">
          <img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64" alt="${item.name}">
          <p>${item.name}</p>
        </a>
      `;
    }, "");

    document.getElementById("site-item-list-container").innerHTML = siteListHTML;
  }
}

async function renderData() {
  await renderSiteList();
}

function siteCreate(formEvent) {
  formEvent.preventDefault();
  let siteObj = utils.formToObject(formEvent.srcElement);
  siteObj.dateTimeCreate = Date.now();

  dbUtils.fnCreate(dbUtils.DB_TABLES.SITE, siteObj);
  formEvent.srcElement.reset();
  renderData();
}

renderData();
