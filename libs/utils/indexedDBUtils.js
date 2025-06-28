const indexedDBUtils = (function () {
  let _dbSchema;
  let _db;
  let _requestDB;

  // START: Funciones de Migración Avanzada ==================================================
  // Función para migrar un store cuyo keyPath (u otra propiedad esencial) ha cambiado
  function migrateStoreWithKeyPathChange(dbObj, tableName, tableDefinitionObj, upgradeTransactionObj) {
    // Se requiere copiar los datos existentes antes de eliminar el store original
    const oldStoreObj = upgradeTransactionObj.objectStore(tableName);
    const tempDataList = [];

    // Abrir un cursor para copiar todos los registros
    const cursorRequestObj = oldStoreObj.openCursor();
    cursorRequestObj.onsuccess = function (e) {
      const cursorObj = e.target.result;
      if (cursorObj) {
        tempDataList.push(cursorObj.value);
        cursorObj.continue();
      } else {
        // Una vez copiados todos los datos, se elimina el store original
        dbObj.deleteObjectStore(tableName);
        // console.log(`Se eliminó el store ${tableName} para recrearlo con la nueva definición.`);

        // Se crea el nuevo store con la definición actual
        const newStoreObj = dbObj.createObjectStore(tableName, { keyPath: tableDefinitionObj.pk, autoIncrement: true });
        tableDefinitionObj.columns.forEach((columnItem) => {
          newStoreObj.createIndex(columnItem.name, columnItem.name, { unique: false });
        });
        // console.log(`Se recreó el store ${tableName} con keyPath ${tableDefinitionObj.pk}`);

        // Reinserción de la data copiada
        tempDataList.forEach((recordItem) => {
          // Si es necesario, aquí se pueden transformar los registros para adaptarlos al nuevo keyPath
          newStoreObj.add(recordItem);
        });
        // console.log(`Se migraron ${tempData.length} registros al nuevo store ${tableName}`);
      }
    };

    cursorRequestObj.onerror = function (e) {
      console.error("Error al migrar los datos del store:", e);
    };
  }

  // Función para actualizar los índices de un store existente sin perder datos
  function migrateIndexes(storeObj, tableDefinitionObj) {
    // Eliminar índices que ya no están definidos en el modelo
    Array.from(storeObj.indexNames).forEach((existingIndexItem) => {
      if (!tableDefinitionObj.columns.includes(existingIndexItem)) {
        storeObj.deleteIndex(existingIndexItem);
        // console.log(`Se elimina el índice ${existingIndexItem} de ${model.name}`);
      }
    });
    // Crear índices que están en el modelo pero que aún no existen en el storeObj
    tableDefinitionObj.columns.forEach((columnItem) => {
      // La propiedad indexNames es un DOMStringList; se convierte a Array para usar includes()
      if (!Array.from(storeObj.indexNames).includes(columnItem.name)) {
        storeObj.createIndex(columnItem.name, columnItem.name, { unique: false });
        // console.log(`Se crea el índice ${column} en ${model.name}`);
      }
    });
  }
  // END: Funciones de Migración Avanzada ==================================================

  // START: Export/Import DB ==================================================
  function fnExporToJsonAsync() {
    return new Promise((resolve, reject) => {
      const requestObj = indexedDB.open(_dbSchema.name, _dbSchema.version);

      requestObj.onerror = function (event) {
        console.error("Error opening IndexedDB:", event);
        reject(event);
      };

      requestObj.onsuccess = function (event) {
        const dbObj = event.target.result;
        const storeNameList = Array.from(dbObj.objectStoreNames);
        const exportDataObj = {};
        let storeCount = storeNameList.length;

        if (storeCount === 0) {
          resolve(JSON.stringify(exportDataObj));
          return;
        }

        storeNameList.forEach((storeNameItem) => {
          const transactionObj = dbObj.transaction(storeNameItem, "readonly");
          const storeObj = transactionObj.objectStore(storeNameItem);
          const itemList = [];
          const cursorRequiestObj = storeObj.openCursor();

          cursorRequiestObj.onsuccess = (event) => {
            const cursosObj = event.target.result;
            if (cursosObj) {
              itemList.push(cursosObj.value);
              cursosObj.continue();
            } else {
              exportDataObj[storeNameItem] = itemList;

              storeCount--;
              if (storeCount === 0) {
                resolve(JSON.stringify(exportDataObj));
              }
            }
          };

          cursorRequiestObj.onerror = (event) => {
            console.error("Error reading data from store:", event);
            reject(event);
          };
        });
      };
    });
  }

  function fnImporFromJsonAsync(jsonText = "") {
    return new Promise((resolve, reject) => {
      const importDataObj = JSON.parse(jsonText);
      const requestObj = indexedDB.open(_dbSchema.name, _dbSchema.version);

      requestObj.onerror = function (event) {
        console.error("Error opening IndexedDB:", event);
        reject(event);
      };

      requestObj.onupgradeneeded = function (event) {
        const dbObj = event.target.result;
        Object.keys(importDataObj).forEach((storeName) => {
          if (!dbObj.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: _dbSchema.tableDefinition[storeName].pk, autoIncrement: true });
          }
        });
      };

      requestObj.onsuccess = function (event) {
        const dbObj = event.target.result;
        const storeNameList = Object.keys(importDataObj);
        let storeCount = storeNameList.length;

        if (storeCount === 0) {
          resolve(true);
          return;
        }

        storeNameList.forEach((storeNameItem) => {
          const transactionObj = dbObj.transaction(storeNameItem, "readwrite");
          const storeObj = transactionObj.objectStore(storeNameItem);

          const clearRequestObj = storeObj.clear();
          clearRequestObj.onsuccess = () => {
            importDataObj[storeNameItem].forEach((item) => {
              storeObj.put(item);
            });
          };

          transactionObj.oncomplete = () => {
            storeCount--;
            if (storeCount === 0) {
              resolve(true);
            }
          };

          transactionObj.onerror = (event) => {
            console.error("Error during import transaction:", event);
            reject(event);
          };
        });
      };
    });
  }
  // END: Export/Import DB ==================================================

  // START: CRUD operations ==================================================
  function fnCreateAsync(tableName, data) {
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction([tableName], "readwrite");
      const storeObj = transactionObj.objectStore(tableName);
      const addRequestObj = storeObj.add(data);

      addRequestObj.onsuccess = function (event) {
        resolve(event.target.result); // Devuelve el ID generado
      };

      addRequestObj.onerror = function (event) {
        console.error(event);
        resolve(null);
      };
    });
  }

  function fnReadAllAsync(tableName, filterText = "") {
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction([tableName], "readonly");
      const storeObj = transactionObj.objectStore(tableName);
      const cursorRequestObj = storeObj.openCursor();
      const itemList = [];

      cursorRequestObj.onsuccess = function (event) {
        const cursorObj = event.target.result;
        if (cursorObj) {
          const recordObj = cursorObj.value;
          const isContainsFilterText = Object.values(recordObj).some((value) => typeof value === "string" && value.toLowerCase().includes(filterText.toLowerCase()));
          if (isContainsFilterText) {
            itemList.push(recordObj);
          }
          cursorObj.continue();
        } else {
          resolve(itemList);
        }
      };

      cursorRequestObj.onerror = function (event) {
        console.error("Error read all:", event);
        resolve(null);
      };
    });
  }

  function fnReadByPKAsync(tableName, pk) {
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction([tableName], "readonly");
      const storeObj = transactionObj.objectStore(tableName);

      const requestObj = storeObj.get(pk);

      requestObj.onsuccess = function (event) {
        resolve(event.target.result);
      };

      requestObj.onerror = function (event) {
        console.error("Error read by pk:", event);
        resolve(null);
      };
    });
  }

  function fnUpdateAsync(tableName, data) {
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction([tableName], "readwrite");
      const storeObj = transactionObj.objectStore(tableName);
      const updateRequestObj = storeObj.put(data);

      updateRequestObj.onsuccess = function (event) {
        resolve(event.target.result); // Resuelve con el resultado (puede ser el ID actualizado)
      };

      updateRequestObj.onerror = function (event) {
        reject(event.target.error); // Rechaza la promesa con el error
      };
    });
  }

  function fnDeleteByPKAsync(tableName, pk) {
    return new Promise((resolve, reject) => {
      const transactionObj = db.transaction([tableName], "readwrite");
      const storeObj = transactionObj.objectStore(tableName);
      const deleteRequestObj = storeObj.delete(pk);

      deleteRequestObj.onsuccess = function (event) {
        resolve(event.target.result); // Resuelve la promesa (puede ser undefined)
      };

      deleteRequestObj.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }
  // END: CRUD operations ==================================================

  function fnInitDB(dbSchema = {}) {
    _dbSchema = dbSchema;

    // init db
    _requestDB = indexedDB.open(_dbSchema.name, _dbSchema.version);

    // on error
    _requestDB.onerror = function (event) {
      console.error("IndexedDB error: ", event);
    };

    //exec on create/update db
    _requestDB.onupgradeneeded = function (event) {
      _db = event.target.result;
      const upgradeTransaction = event.target.transaction;

      Object.entries(_dbSchema.tableDefinition).forEach((table) => {
        const tableName = table[0];
        const tableDefinitionObj = table[1];
        if (_db.objectStoreNames.contains(tableName)) {
          const store = upgradeTransaction.objectStore(tableName);

          if (store.keyPath !== tableDefinitionObj.pk) {
            // Si el keyPath ha cambiado, migrar el store
            migrateStoreWithKeyPathChange(_db, tableName, tableDefinitionObj, upgradeTransaction);
          } else {
            // Actualiar indices sin perder datos
            migrateIndexes(store, tableDefinitionObj);
          }
        } else {
          // Si el store no existe, crearlo
          const newStore = _db.createObjectStore(tableName, { keyPath: tableDefinitionObj.pk, autoIncrement: true });
          tableDefinitionObj.columns.forEach((column) => {
            newStore.createIndex(column.name, column.name, { unique: false });
          });
        }
      });
    };
  }

  return {
    fnInitDB,
    fnExporToJsonAsync,
    fnImporFromJsonAsync,
    fnCreateAsync,
    fnReadAllAsync,
    fnReadByPKAsync,
    fnUpdateAsync,
    fnDeleteByPKAsync,
  };
})();

export default indexedDBUtils;
