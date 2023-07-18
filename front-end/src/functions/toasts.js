import { toast } from "react-toastify";

export const popupSuccess = (msg) => {
  toast.success(msg, {
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    position:"bottom-right"
  });
};

export const popupError = (msg) => {
  toast.error(msg, {
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    position:"bottom-left"
  });
};

export const popupWarning = (msg) => {
  toast.warning(msg, {
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    position:"bottom-center"
  });
};