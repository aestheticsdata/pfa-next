import Swal from 'sweetalert2';

export const displayPopup = (message) => {
  Swal.fire({
    title: message.title || '',
    text: message.text || '',
    icon: 'success',
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    width: '300px',
  });
};
