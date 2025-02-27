var dbUtils =
  dbUtils ||
  (function () {
    let db;
    const DB_VERSION = 1;
    const DB_NAME = "homepageDB";
    const DB_TABLES = {
      SETTINGS: "settings",
      SITE: "site",
      CLOCK: "clock",
      SEARCHENGINE: "searchengine",
    };
    const DB_TABLES_MODELS = [
      {
        name: DB_TABLES.SETTINGS,
        pk: "id",
        columns: ["dateTimeCreate", "typeOpenTab", "searchEngine"],
      },
      {
        name: DB_TABLES.SEARCHENGINE,
        pk: "id",
        columns: ["dateTimeCreate", "name", "url"],
      },
      {
        name: DB_TABLES.SITE,
        pk: "id",
        columns: ["dateTimeCreate", "name", "url", "description", "tags"],
      },
      {
        name: DB_TABLES.CLOCK,
        pk: "id",
        columns: ["dateTimeCreate", "name", "utc", "format24H"],
      },
    ];

    //init db on v1
    const requestDB = indexedDB.open(DB_NAME, DB_VERSION);

    //on error
    requestDB.onerror = function (event) {
      console.error("db error", event);
    };

    //exec on create/update db
    requestDB.onupgradeneeded = function (event) {
      db = event.target.result;
      const upgradeTransaction = event.target.transaction;

      DB_TABLES_MODELS.forEach((model) => {
        if (db.objectStoreNames.contains(model.name)) {
          // El store existe; obtenemos la referencia del upgradeTransaction.
          const store = upgradeTransaction.objectStore(model.name);

          // Si el keyPath es distinto, se requiere una migración completa (copia de datos)
          if (store.keyPath !== model.pk) {
            // console.log(`El object store ${model.name} tiene un keyPath distinto. Se realizará migración completa.`);
            migrateStoreWithKeyPathChange(db, model, upgradeTransaction);
          } else {
            // Actualizar índices sin perder datos
            migrateIndexes(store, model);
          }
        } else {
          // Si el store no existe, lo creamos con la definición actual
          const newStore = db.createObjectStore(model.name, { keyPath: model.pk, autoIncrement: true });
          model.columns.forEach((column) => {
            newStore.createIndex(column, column, { unique: false });
            // console.log(`Se crea el índice ${column} en ${model.name}`);
          });
        }
      });
    };

    /* ====================================
      Funciones de Migración Avanzada
    ==================================== */

    // Función para actualizar los índices de un store existente sin perder datos
    function migrateIndexes(store, model) {
      // Eliminar índices que ya no están definidos en el modelo
      Array.from(store.indexNames).forEach((existingIndex) => {
        if (!model.columns.includes(existingIndex)) {
          store.deleteIndex(existingIndex);
          // console.log(`Se elimina el índice ${existingIndex} de ${model.name}`);
        }
      });
      // Crear índices que están en el modelo pero que aún no existen en el store
      model.columns.forEach((column) => {
        // La propiedad indexNames es un DOMStringList; se convierte a Array para usar includes()
        if (!Array.from(store.indexNames).includes(column)) {
          store.createIndex(column, column, { unique: false });
          // console.log(`Se crea el índice ${column} en ${model.name}`);
        }
      });
    }

    // Función para migrar un store cuyo keyPath (u otra propiedad esencial) ha cambiado
    function migrateStoreWithKeyPathChange(db, model, upgradeTransaction) {
      // Se requiere copiar los datos existentes antes de eliminar el store original
      const oldStore = upgradeTransaction.objectStore(model.name);
      const tempData = [];

      // Abrir un cursor para copiar todos los registros
      const cursorRequest = oldStore.openCursor();
      cursorRequest.onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
          tempData.push(cursor.value);
          cursor.continue();
        } else {
          // Una vez copiados todos los datos, se elimina el store original
          db.deleteObjectStore(model.name);
          // console.log(`Se eliminó el store ${model.name} para recrearlo con la nueva definición.`);

          // Se crea el nuevo store con la definición actual
          const newStore = db.createObjectStore(model.name, { keyPath: model.pk, autoIncrement: true });
          model.columns.forEach((column) => {
            newStore.createIndex(column, column, { unique: false });
          });
          // console.log(`Se recreó el store ${model.name} con keyPath ${model.pk}`);

          // Reinserción de la data copiada
          tempData.forEach((record) => {
            // Si es necesario, aquí se pueden transformar los registros para adaptarlos al nuevo keyPath
            newStore.add(record);
          });
          // console.log(`Se migraron ${tempData.length} registros al nuevo store ${model.name}`);
        }
      };

      cursorRequest.onerror = function (e) {
        console.error("Error al migrar los datos del store:", e);
      };
    }

    //on init db
    requestDB.onsuccess = function (event) {
      db = event.target.result;
      // console.log(event);
    };

    /* ====================================
      Export/Import DB
    ==================================== */

    function exportIndexedDBToJSON() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
          console.error(event);
          reject("Error al abrir la base de datos para exportar.");
        };

        request.onsuccess = (event) => {
          const _db = event.target.result;
          const storeNames = Array.from(_db.objectStoreNames);
          const exportData = {};
          let pendingStores = storeNames.length;

          if (pendingStores === 0) {
            resolve(JSON.stringify(exportData));
            return;
          }

          storeNames.forEach((storeName) => {
            const transaction = _db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const items = [];
            const cursorRequest = store.openCursor();

            cursorRequest.onsuccess = (event) => {
              const cursor = event.target.result;
              if (cursor) {
                items.push(cursor.value);
                cursor.continue();
              } else {
                exportData[storeName] = items;
                pendingStores--;
                if (pendingStores === 0) {
                  // Cuando ya se han leído todos los stores, se convierte el objeto a JSON
                  resolve(JSON.stringify(exportData));
                }
              }
            };

            cursorRequest.onerror = (event) => {
              console.error(event);
              reject(`Error al leer el store ${storeName}`);
            };
          });
        };
      });
    }

    function importJSONToIndexedDB(jsonString) {
      return new Promise((resolve, reject) => {
        const importData = JSON.parse(jsonString);
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
          console.error(event);
          reject("Error al abrir la base de datos para importar.");
        };

        // En onupgradeneeded, se crean los object stores que no existan
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          Object.keys(importData).forEach((storeName) => {
            if (!db.objectStoreNames.contains(storeName)) {
              // Se usa un keyPath por defecto; ajusta según tu modelo de datos
              db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
          });
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const storeNames = Object.keys(importData);
          let pendingStores = storeNames.length;

          if (pendingStores === 0) {
            resolve();
            return;
          }

          storeNames.forEach((storeName) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            // Opcional: limpiar datos previos antes de la importación
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => {
              // Agregar cada registro del JSON al store
              importData[storeName].forEach((item) => {
                store.put(item);
              });
            };

            transaction.oncomplete = () => {
              pendingStores--;
              if (pendingStores === 0) {
                resolve();
              }
            };

            transaction.onerror = (event) => {
              console.error(event);
              reject(`Error al importar datos en el store ${storeName}`);
            };
          });
        };
      });
    }

    /* ====================================
      CRUD operations
    ==================================== */

    // Función para agregar registro (CREATE)
    function Create(table, data) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([table], "readwrite");
        const store = transaction.objectStore(table);
        const addRequest = store.add(data);

        addRequest.onsuccess = function (event) {
          resolve(event.target.result); // Devuelve el ID generado
        };

        addRequest.onerror = function (event) {
          console.error(event);
          // reject(event.target.error); // Devuelve el error
          resolve(null);
        };
      });
    }

    // Función para obtener y mostrar todos los usuarios (READ)
    function ReadAll(table, filterText = "") {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([table], "readonly");
        const store = transaction.objectStore(table);
        const cursorRequest = store.openCursor();
        const values = [];

        cursorRequest.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            const record = cursor.value;
            const containsFilterText = Object.values(record).some(
              (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(filterText.toLowerCase())
            );
            if(containsFilterText){
              values.push(record);
            }
            cursor.continue();
          } else {
            resolve(values);
          }
        };

        cursorRequest.onerror = function (event) {
          console.error("Error read all:", event);
          // reject(event);
          resolve(values);
        };
      });
    }

    function ReadById(table, id) {
      return new Promise((resolve, reject) => {
        // Se inicia una transacción en modo de solo lectura para el object store especificado
        const transaction = db.transaction([table], "readonly");
        const store = transaction.objectStore(table);

        // Se solicita obtener el objeto con la clave proporcionada (id)
        const request = store.get(id);

        // Si la operación es exitosa, se resuelve la Promise con el objeto obtenido
        request.onsuccess = function (event) {
          resolve(event.target.result);
        };

        // Si ocurre un error, se rechaza la Promise con el error
        request.onerror = function (event) {
          console.error("Error read by id:", event);
          // reject(event);
          resolve(null);
        };
      });
    }

    // Función para actualizar un registro (UPDATE)
    function Update(table, data) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([table], "readwrite");
        const store = transaction.objectStore(table);
        const updateRequest = store.put(data);

        updateRequest.onsuccess = function (event) {
          resolve(event.target.result); // Resuelve con el resultado (puede ser el ID actualizado)
        };

        updateRequest.onerror = function (event) {
          reject(event.target.error); // Rechaza la promesa con el error
        };
      });
    }

    // Función para eliminar un registro (DELETE)
    function DeleteById(table, id) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([table], "readwrite");
        const store = transaction.objectStore(table);
        const deleteRequest = store.delete(id);

        deleteRequest.onsuccess = function (event) {
          resolve(event.target.result); // Resuelve la promesa (puede ser undefined)
        };

        deleteRequest.onerror = function (event) {
          reject(event.target.error);
        };
      });
    }

    return {
      DB_VERSION,
      DB_NAME,
      DB_TABLES,
      DB_TABLES_MODELS,
      exportIndexedDBToJSON,
      importJSONToIndexedDB,
      Create,
      ReadAll,
      ReadById,
      Update,
      DeleteById,
    };
  })();
