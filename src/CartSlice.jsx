import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        itemCount: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
            state.itemCount++;
        },
        removeItem: (state, action) => {
            state.itemCount -= state.items.find(item => item.name === action.payload).quantity;
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                state.itemCount -= existingItem.quantity;
                existingItem.quantity = quantity;
                state.itemCount += quantity;
            } 
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
