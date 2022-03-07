import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrefrenceState {
    subscribedChats: string[];
    viewedChat: string;
}

const initialState: PrefrenceState = {
    subscribedChats: [],
    viewedChat: "",
}
const prefrenceSlice = createSlice({
    name: "prefrence",
    initialState,
    reducers: {
        subscribeToChat: (state, action: PayloadAction<string>) => {
            const chatId = action.payload;
            if (state.subscribedChats.includes(chatId)) {
                return;
            }
            state.subscribedChats.push(chatId);
        },
        unsubscribeToChat: (state, action: PayloadAction<string>) => {
            state.subscribedChats = state.subscribedChats.filter(chatId => chatId !== action.payload);
        },
        setViewedChat: (state, action: PayloadAction<string>) => {
            state.viewedChat = action.payload;
        }
    }
});

export default prefrenceSlice.reducer;
export const { subscribeToChat, unsubscribeToChat, setViewedChat } = prefrenceSlice.actions;