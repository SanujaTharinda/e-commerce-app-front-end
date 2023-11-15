import { createAction } from '@reduxjs/toolkit';

export const toastAction = createAction("toast");

export const invokeToast = (message, type) => toastAction({message, type});