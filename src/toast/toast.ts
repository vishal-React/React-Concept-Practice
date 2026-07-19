import { toast } from "sonner";

type ToastOptions = Parameters<typeof toast>[1];

// basic toast
export const showToast = (msg: string, options?: ToastOptions) =>
  toast(msg, options);

// success
export const showSuccess = (msg: string, options?: ToastOptions) =>
  toast.success(msg, options);

// error
export const showError = (msg: string, options?: ToastOptions) =>
  toast.error(msg, options);

// warning
export const showWarning = (msg: string, options?: ToastOptions) =>
  toast.warning(msg, options);

// info
export const showInfo = (msg: string, options?: ToastOptions) =>
  toast.info(msg, options);

// loading
export const showLoading = (msg: string, options?: ToastOptions) =>
  toast.loading(msg, options);

type PromiseMessages = {
  loading?: string;
  success?: string;
  error?: string;
};

export const showPromise = <T>(
  promise: Promise<T>,
  messages: PromiseMessages,
) =>
  toast.promise(promise, {
    loading: messages.loading ?? "Loading...",
    success: messages.success ?? "Success",
    error: messages.error ?? "Something went wrong",
  });

// dismiss specific toast
export const dismissToast = (id?: string | number) => toast.dismiss(id);

// dismiss all toasts
export const dismissAllToasts = () => toast.dismiss();
