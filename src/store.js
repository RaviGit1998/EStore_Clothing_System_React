import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/Reducers/cartSlice";


const store=configureStore({
     reducer:{
        cart:cartReducer,
     }
})

export default store;