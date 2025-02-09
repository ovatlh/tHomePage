var utils =
  utils ||
  (function () {
    function formToObject(formElement) {
      return Object.fromEntries(new FormData(formElement));
    }

    function objectToForm(formId, data) {
      const form = document.getElementById(formId);

      if (!form) {
        return;
      }

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const input = form.querySelector(`[id="input.${key}"]`);
          if (input) {
            if(input.type == "checkbox") {
              input.checked = data[key];
            } else {
              input.value = data[key];
            }
          }
        }
      }
    }

    function sortByProperty(arr, property, order = "desc") {
      return arr.sort((a, b) => {
        const valueA = a[property];
        const valueB = b[property];

        // Si ambos valores son cadenas, se utiliza localeCompare para comparar
        if (typeof valueA === "string" && typeof valueB === "string") {
          const comparison = valueA.localeCompare(valueB);
          return order === "asc" ? comparison : -comparison;
        } else {
          // Para números u otros tipos
          if (valueA < valueB) return order === "asc" ? -1 : 1;
          if (valueA > valueB) return order === "asc" ? 1 : -1;
          return 0;
        }
      });
    }

    async function asyncDelay(seconds = 0) {
      const ms = 1000;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, ms * seconds);
      });
    }

    function downloadJSON(jsonString, fileName = "data.json") {
      // Crear un Blob a partir del string JSON
      const blob = new Blob([jsonString], { type: "application/json" });
      // Generar una URL temporal para el Blob
      const url = URL.createObjectURL(blob);
      // Crear un elemento <a> y configurar sus atributos
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      // Agregar el elemento al documento (opcional)
      document.body.appendChild(a);
      // Simular un click para iniciar la descarga
      a.click();
      // Limpiar: eliminar el enlace y revocar la URL
      a.remove();
      URL.revokeObjectURL(url);
    }

    function timeWithUTC(utc = 0, isFormat24H = false) {
      const time = new Date();
      const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60 * 1000);
      const timeResult = new Date(timeUTC.getTime() + utc * 60 * 60 * 1000);
      const format = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !isFormat24H,
      };
      const timeFormated = timeResult.toLocaleTimeString(undefined, format);
      return timeFormated;
    }

    return {
      formToObject,
      objectToForm,
      sortByProperty,
      asyncDelay,
      downloadJSON,
      timeWithUTC
    };
  })();
