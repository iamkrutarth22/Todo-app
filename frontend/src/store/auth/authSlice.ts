import { createSlice } from "@reduxjs/toolkit";
import type { IAuth } from "../../models/Auth";

const initialState:IAuth={
    accessToken:null,
    user:{
        userId:null,
        username:'',
        email:'',
    }

}

const authSlice=createSlice({
    name:'authslice',
    initialState:initialState,
    reducers:{
        login(state,action){
            state.accessToken= action.payload.accessToken
            state.user= action.payload.user
        },
        logout(state){
            state.accessToken=initialState.accessToken
            state.user=initialState.user
        }
    }
})

const authReducer=authSlice.reducer

export const authActions=authSlice.actions
export default authReducer