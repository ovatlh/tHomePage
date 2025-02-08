var dbUtils =
  dbUtils ||
  (function () {
    let db;
    const DB_VERSION = 1;
    const DB_NAME = "homepageDB";
    const DB_TABLES = {
      USER: "user",
    };
    const DB_TABLES_MODELS = [
      {
        name: DB_TABLES.USER,
        pk: "id",
        columns: ["dateTimeCCreate", "name", "email"],
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
      CRUD operations
    ==================================== */

    // Función para agregar registro (CREATE)
    function fnCreate(table, data) {
      const transaction = db.transaction([table], "readwrite");
      const store = transaction.objectStore(table);
      const addRequest = store.add(data);
      addRequest.onsuccess = function (event) {
        // console.log("data added:", event.target.result, data);
      };
      addRequest.onerror = function (event) {
        console.error("Error data added:", event);
      };
    }

    // Función para obtener y mostrar todos los usuarios (READ)
    function fnReadAll(table) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([table], "readonly");
        const store = transaction.objectStore(table);
        const cursorRequest = store.openCursor();
        const values = [];

        cursorRequest.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            values.push(cursor.value);
            cursor.continue();
          } else {
            resolve(values);
          }
        };

        cursorRequest.onerror = function (event) {
          console.error("Error read all:", event);
          reject(event);
        };
      });
    }

    // Función para actualizar un registro (UPDATE)
    function fnUpdate(table, data) {
      const transaction = db.transaction([table], "readwrite");
      const store = transaction.objectStore(table);
      const updateRequest = store.put(data);
      updateRequest.onsuccess = function (event) {
        // console.log("data updated", event);
      };
      updateRequest.onerror = function (event) {
        console.error("Error data updated:", event);
      };
    }

    // Función para eliminar un registro (DELETE)
    function fnDeleteById(table, id) {
      const transaction = db.transaction([table], "readwrite");
      const store = transaction.objectStore(table);
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = function (event) {
        // console.log("data deleted", event);
      };
      deleteRequest.onerror = function (event) {
        console.error("Error data deñete:", event);
      };
    }

    return {
      DB_VERSION,
      DB_NAME,
      DB_TABLES,
      DB_TABLES_MODELS,
      fnCreate,
      fnReadAll,
      fnUpdate,
      fnDeleteById
    };
  })();
