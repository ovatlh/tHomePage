import DB_SCHEMA from "./dbSchema.js";
import indexedDBUtils from "../libs/utils/indexedDBUtils.js";
import tmodals from "../libs/tmodals/v0.1.0/tmodals.module.js";

indexedDBUtils.fnInitDB(DB_SCHEMA);
