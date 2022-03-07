import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./Reducers/popupSlice";
import prefrenceSlice from "./Reducers/prefrenceSlice";

const store = configureStore({
    reducer: {
        prefrence: prefrenceSlice,
        popup: popupSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;