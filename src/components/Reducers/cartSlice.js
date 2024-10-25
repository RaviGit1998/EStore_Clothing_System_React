import { createSlice } from "@reduxjs/toolkit";



const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
       selectedItems:[]
    },
    reducers:{
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.selectedVariant.productVariantId === item.selectedVariant.productVariantId);
            if (!existingItem) {
                state.items.push(item);
              }
        },
        updateQuantity: (state, action) => {
            const { productVariantId, quantity } = action.payload;
            const item = state.items.find(i => i.selectedVariant.productVariantId === productVariantId);
            if (item) {
                item.quantity = quantity;
            }
        },
        
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.selectedVariant.productVariantId !== action.payload);
        },
        selectItem: (state, action) => {
            const productVariantId = action.payload;
            const isSelected = state.selectedItems.includes(productVariantId);
            if (isSelected) {
              state.selectedItems = state.selectedItems.filter(id => id !== productVariantId);
            } else {
              state.selectedItems.push(productVariantId);
            }
          },
          clearCart: (state) => {
            state.cartItems = [];
            state.selectedItems = [];
          },
    }
})


export const { addItem, updateQuantity, removeItem, selectedItems,clearCart } = cartSlice.actions;
export default cartSlice.reducer;