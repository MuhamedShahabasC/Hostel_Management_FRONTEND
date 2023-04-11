import Swal from "sweetalert2";

export const customPopup = Swal.mixin({
  customClass: {
    title: "!text-xl !mt-3 !text-primary",
    denyButton: "!text-sm",
    cancelButton: "!text-sm",
    closeButton: "!text-sm",
    confirmButton: "!text-sm",
  },
});
