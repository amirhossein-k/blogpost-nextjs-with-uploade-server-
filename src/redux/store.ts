import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook} from "react-redux";
import {useSelector} from "react-redux/";
import uploade from "./features/upload";

export const store = configureStore({
  reducer: {uploade},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
