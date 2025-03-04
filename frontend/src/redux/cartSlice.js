import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;  // ✅ Set cart when user logs in
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.find((item) => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter((item) => item._id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.cart = [];  // ✅ Clear cart when user logs out
        },
    },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
