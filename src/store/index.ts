import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";


const rootReducer = combineReducers({
  gameSlice
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch