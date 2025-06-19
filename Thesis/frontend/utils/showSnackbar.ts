import { Snackbar } from 'react-native-paper';

let snackbarRef: any = null;

export const setSnackbarRef = (ref: any) => {
  snackbarRef = ref;
};

export const showSnackbar = (message: string, duration: number = 3000) => {
  if (snackbarRef) {
    snackbarRef.show({
      text: message,
      duration,
    });
  }
};
