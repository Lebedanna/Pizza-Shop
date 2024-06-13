import {configureStore} from "@reduxjs/toolkit";
import {JWT_PERSISTENT_STATE, userSlice} from "./user.slice.ts";
import {saveState} from "./storage.ts";
import {CART_PERSISTENT_STATE, cartSlice} from "./cart.slice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer
    }
})

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch