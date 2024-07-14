import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUsers } from "../../Types/types";
 
export interface AuthState {
    isAthenticated: boolean;
    user: TUsers | null;
    token: string | null;
 
}
const initialState: AuthState = {
    isAthenticated: false,
    user: null,
    token: null,
}
 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.isAthenticated = action.payload.isAthenticated;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAthenticated = false
            state.user = null;
            state.token = null;
        },
    },
});
 
export const { setUser, logout } = authSlice.actions;  
export default authSlice.reducer;