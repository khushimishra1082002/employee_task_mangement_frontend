import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../Fetatures/TaskSlice";
import userReducer from "../Fetatures/UserSlice"
import profileReducer from "../Fetatures/ProfileSlice"

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users:userReducer,
    profile:profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
