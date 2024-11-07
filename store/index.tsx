"use client";

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dashboardReducer from "./slice/dashboard";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

const makeStore = () =>
  configureStore({
    reducer: {
      dashboard: dashboardReducer,
    },
    devTools: process.env.NODE_ENV === "development",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
