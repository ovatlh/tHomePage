var sweetalert2Utils =
  sweetalert2Utils ||
  (function () {
    function showModal(title = "", html = "", fnDidOpen = null) {
      Swal.fire({
        title: title,
        showConfirmButton: false,
        html: html,
        didOpen: function() {
          if(fnDidOpen) {
            fnDidOpen();
          }
        }
      });
    }

    function showToast(message = "", timeSec = 3) {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: message,
        showConfirmButton: false,
        timer: 1000 * timeSec,
        timerProgressBar: true,
      });
    }

    function close() {
      Swal.close();
    }

    return {
      close,
      showModal,
      showToast,
    };
  })();
