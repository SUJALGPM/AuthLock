import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { message } from "antd";


// Create a initialState..
const initialState = {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}


// Register APIs handle...
export const registerUser = createAsyncThunk('registerUser', async (format) => {
    const response = await axios.post("http://localhost:8200/api/user/register", format, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response) {
        message.success("User successfully registered...");
    } else {
        message.error("Failed to register..!!!");
    }

    return await response.data;
});


// Login API handle...
export const loginUser = createAsyncThunk('loginUser', async (format) => {
    const response = await axios.post("http://localhost:8200/api/user/login", format, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response) {
        message.success("User successfully Login...");
    } else {
        message.error("Failed to Login..!!!");
    }

    return await response.data;
});


// Configure the authSlice
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload.msg;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null; // Clear any previous error
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload.msg;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null; // Clear any previous error
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default authSlice.reducer;
