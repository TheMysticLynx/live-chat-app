import { createSlice } from "@reduxjs/toolkit";

interface PopupState {
    AddNewChat: boolean;
}

const initialState: PopupState = {
    AddNewChat: false
}

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        showAddNewChat: (state) => {
            state.AddNewChat = true;
        },
        hideAddNewChat: (state) => {
            state.AddNewChat = false;
        }
    }
})

export default popupSlice.reducer;
export const { showAddNewChat, hideAddNewChat } = popupSlice.actions;