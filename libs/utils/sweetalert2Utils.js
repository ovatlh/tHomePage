var sweetalert2Utils =
  sweetalert2Utils ||
  (function () {
    function close() {
      Swal.close();
    }

    function showModal(title = "", html = "", fnDidOpen = null, fnDidClose = null) {
      Swal.fire({
        title: title,
        showConfirmButton: false,
        html: html,
        didOpen: function() {
          if(fnDidOpen) {
            fnDidOpen();
          }
        },
        didClose: function() {
          if(fnDidClose) {
            fnDidClose();
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

    function showDialog({
      title = "", 
      okText = "Ok", 
      cancelText = "Cancel", 
      fnOk = null
    }) {
      Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: okText,
        cancelButtonText: cancelText,
      }).then((result) => {
        if(result.isConfirmed) {
          if(fnOk) {
            fnOk();
          }
        }
      });
    }

    return {
      close,
      showModal,
      showToast,
      showDialog,
    };
  })();
