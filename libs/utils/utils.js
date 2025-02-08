var utils =
  utils ||
  (function () {
    function formToObject(formElement) {
      return Object.fromEntries(new FormData(formElement));
    }

    function objectToForm(formId, data) {
      const form = document.getElementById(formId);

      if(!form) {
        return;
      }

      for (const key in data) {
        if(data.hasOwnProperty(key)) {
          const input = form.querySelector(`[id="input.${key}"]`);
          if(input) {
            input.value = data[key];
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

    return {
      formToObject,
      objectToForm,
      sortByProperty,
      asyncDelay,
    };
  })();
