import DB_SCHEMA from "../dbSchema.js";
import indexedDBUtils from "../../libs/utils/indexedDBUtils.js";
import tmodals from "../../libs/tmodals/v0.1.0/tmodals.module.js";

import crudSITE from "./site.module.js";

const crudCONFIG = (function () {
  async function fnInitConfigAsync() {
    let config = await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.CONFIG.name, 1);
    if(!config) {
      const data = {
        dateTimeCreated: Date.now(),
        openSiteMode: "new-tab",
      };
      await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, data);
      config = data;
    }
    await crudSITE.fnSetSiteOpenModeAsync(config.openSiteMode);
  }

  function fnInitFormConfig() {
    const template = document.getElementById("templateFormConfig").innerHTML;
    tmodals.fnShow({
      html: template,
      isBackgroundVisible: true,
      isCloseWithBackground: true,
    });
  }

  return {
    fnInitConfigAsync,
    fnInitFormConfig,
  };
})();

export default crudCONFIG;
