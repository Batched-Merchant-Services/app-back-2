export const toggleSnackbarOpen = (message,typeSnack) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  message,
  typeSnack: typeSnack?typeSnack:'error'
});

export const toggleSnackbarClose = () => ({
  type: "TOGGLE_SNACKBAR_CLOSE",
});




