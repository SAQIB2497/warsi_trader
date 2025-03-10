import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    isLoading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
            state.isLoading = false;
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart)); // Save to localStorage
            state.isLoading = false;
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            state.isLoading = false;
        },
        increaseQuantity: (state, action) => {
            state.isLoading = true;
            const item = state.cart.find((item) => item._id === action.payload);
            if (item) item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            state.isLoading = false;
        },
        decreaseQuantity: (state, action) => {
            state.isLoading = true;
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter((item) => item._id !== action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
            state.isLoading = false;
        },
        clearCart: (state) => {
            state.isLoading = true;
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // ✅ Global loading control
        }
    },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
