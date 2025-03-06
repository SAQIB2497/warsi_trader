import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const initialState = {
    cart: loadCartFromLocalStorage(),
    status: 'idle', // Track API call status if needed
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       setCart: (state, action) => {
            // ✅ Accept full product objects with quantities
            state.cart = action.payload.map(item => ({
                ...item,
                quantity: item.quantity || 1 // Fallback for legacy data
            }));
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.find((item) => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item) item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter((item) => item._id !== action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;