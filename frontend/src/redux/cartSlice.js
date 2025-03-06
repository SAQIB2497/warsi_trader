import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const initialState = {
    cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
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
            localStorage.removeItem("cart");
        },
    },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;