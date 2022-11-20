import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';

const initialState = {
    loginState: Cookies.get("loginState") || false, input: {
        name: [""],
        image: [""],
        post: [""]
    }
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        signUpMethod: (state, action) => {
            state.userData = [...state.userData, action.payload];
        },
        loginMethod: (state, action) => {
            state.loginState = action.payload
        },
        setInput: (state, action) => {
            state.input = { ...state.input, [action.payload.name]: [action.payload.value] };
        },
        editMethod: (state, action) => {
            state.input = action.payload
        }
    }
})

export const { signUpMethod, loginMethod, setInput, editMethod } = dataSlice.actions;
export default dataSlice.reducer;