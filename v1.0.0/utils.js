var utils =
  utils ||
  (function () {
    function formToObject(formElement) {
      return Object.fromEntries(new FormData(formElement));
    }

    function objectToForm(formElement, data) {
      //TODO set values on html inputs
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

    return {
      formToObject,
      objectToForm,
      sortByProperty,
    };
  })();
