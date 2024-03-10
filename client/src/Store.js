import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";


//Create a store..
const store = configureStore({
    reducer: {
        user: authSlice
    }
});


export default store;